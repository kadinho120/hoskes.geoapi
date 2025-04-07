const express = require('express');
const requestIp = require('request-ip');
const maxmind = require('maxmind');
const path = require('path');
const { performance } = require('perf_hooks');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(requestIp.mw());

// Load MaxMind GeoLite2 database
let lookup;
maxmind.open(path.join(__dirname, 'GeoLite2-City.mmdb')).then((cityLookup) => {
    lookup = cityLookup;
});

// Load plugins dynamically from ./plugins
const plugins = {};
const pluginDir = path.join(__dirname, 'plugins');
fs.readdirSync(pluginDir).forEach(file => {
    const name = file.split('.')[0];
    plugins[name] = require(path.join(pluginDir, file));
});

app.get('/json.gp', async (req, res) => {
    const start = performance.now();

    let ip = req.clientIp;
    if (ip === '::1' || ip === '127.0.0.1') {
        ip = '8.8.8.8'; // fallback IP for local testing
    }

    if (!lookup) {
        return res.status(500).json({ error: 'Geo database not loaded yet' });
    }

    const geo = lookup.get(ip);
    if (!geo) {
        return res.status(404).json({ error: 'Location not found' });
    }

    const location = geo.location || {};
    const subdivision = geo.subdivisions?.[0] || {};

    const response = {
        hoskes_locplugin_request: ip,
        hoskes_locplugin_status: 200,
        hoskes_locplugin_delay: '', // calculated later
        hoskes_locplugin_credit: "Returned data includes GeoLite2 data created by MaxMind, available from <a href='https://www.maxmind.com'>https://www.maxmind.com</a>.",
        hoskes_locplugin_city: geo.city?.names?.en || "",
        hoskes_locplugin_region: subdivision.names?.en || "",
        hoskes_locplugin_regionCode: subdivision.iso_code || "",
        hoskes_locplugin_regionName: subdivision.names?.en || "",
        hoskes_locplugin_countryCode: geo.country?.iso_code || "",
        hoskes_locplugin_countryName: geo.country?.names?.en || "",
        hoskes_locplugin_inEU: geo.country?.is_in_european_union ? 1 : 0,
        hoskes_locplugin_continentCode: geo.continent?.code || "",
        hoskes_locplugin_continentName: geo.continent?.names?.en || "",
        hoskes_locplugin_latitude: location.latitude?.toString() || "",
        hoskes_locplugin_longitude: location.longitude?.toString() || "",
        hoskes_locplugin_locationAccuracyRadius: location.accuracy_radius?.toString() || "",
        hoskes_locplugin_timezone: location.time_zone || ""
    };

    const requestedPlugins = (req.query.plugins || '').split(',').map(p => p.trim().toLowerCase());

    for (const pluginName of requestedPlugins) {
        if (plugins[pluginName]) {
            const pluginData = await plugins[pluginName](ip, {
                latitude: location.latitude,
                longitude: location.longitude,
                country_code: geo.country?.iso_code || ""
            });
            Object.assign(response, pluginData);
        }
    }

    response.hoskes_locplugin_delay = (performance.now() - start).toFixed(2) + 'ms';
    res.json(response);
});

app.listen(PORT, () => {
    console.log(`Hoskes LocPlugin API running at http://localhost:${PORT}/json.gp`);
});