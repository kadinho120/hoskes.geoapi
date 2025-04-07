const express = require('express');
const requestIp = require('request-ip');
const maxmind = require('maxmind');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(requestIp.mw());

// Load the MaxMind DB (GeoLite2)
let lookup;
maxmind.open(path.join(__dirname, 'GeoLite2-City.mmdb')).then((cityLookup) => {
    lookup = cityLookup;
});

app.get('/json.gp', async (req, res) => {
    let ip = req.clientIp;

    if (ip === '::1' || ip === '127.0.0.1') {
        ip = '8.8.8.8'; // fallback for testing
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
        geoplugin_request: ip,
        geoplugin_status: 200,
        geoplugin_delay: "1ms",
        geoplugin_credit: "Some of the returned data includes GeoLite2 data created by MaxMind, available from <a href='https://www.maxmind.com'>https://www.maxmind.com</a>.",
        geoplugin_city: geo.city?.names?.en || "",
        geoplugin_region: subdivision.names?.en || "",
        geoplugin_regionCode: subdivision.iso_code || "",
        geoplugin_regionName: subdivision.names?.en || "",
        geoplugin_areaCode: "",
        geoplugin_dmaCode: "",
        geoplugin_countryCode: geo.country?.iso_code || "",
        geoplugin_countryName: geo.country?.names?.en || "",
        geoplugin_inEU: geo.country?.is_in_european_union ? 1 : 0,
        geoplugin_euVATrate: false,
        geoplugin_continentCode: geo.continent?.code || "",
        geoplugin_continentName: geo.continent?.names?.en || "",
        geoplugin_latitude: location.latitude?.toString() || "",
        geoplugin_longitude: location.longitude?.toString() || "",
        geoplugin_locationAccuracyRadius: location.accuracy_radius?.toString() || "",
        geoplugin_timezone: location.time_zone || "",
        geoplugin_currencyCode: geo.country?.currency?.code || "BRL",
        geoplugin_currencySymbol: null,
        geoplugin_currencySymbol_UTF8: "",
        geoplugin_currencyConverter: 5.6727
    };

    res.json(response);
});

app.listen(PORT, () => {
    console.log(`GeoPlugin-style API running at http://localhost:${PORT}/json.gp`);
});
