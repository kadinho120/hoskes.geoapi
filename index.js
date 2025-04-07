const express = require('express');
const axios = require('axios');
const requestIp = require('request-ip');

const app = express();
const PORT = 3000;

app.use(requestIp.mw());

app.get('/json.gp', async (req, res) => {
    let ip = req.clientIp;

    // If you're testing locally, use a public IP fallback
    if (ip === '::1' || ip === '127.0.0.1') {
        ip = '0'; // Your real IP for testing
    }

    try {
        const geo = await axios.get(`https://ipapi.co/${ip}/json/`);

        // Format output like GeoPlugin
        const response = {
            geoplugin_request: ip,
            geoplugin_status: 200,
            geoplugin_delay: "1ms",
            geoplugin_credit: "Some of the returned data includes GeoLite2 data created by MaxMind, available from <a href='https://www.maxmind.com'>https://www.maxmind.com</a>.",
            geoplugin_city: geo.data.city || "",
            geoplugin_region: geo.data.region || "",
            geoplugin_regionCode: geo.data.region_code || "",
            geoplugin_regionName: geo.data.region || "",
            geoplugin_areaCode: "",
            geoplugin_dmaCode: "",
            geoplugin_countryCode: geo.data.country_code || "",
            geoplugin_countryName: geo.data.country_name || "",
            geoplugin_inEU: geo.data.in_eu ? 1 : 0,
            geoplugin_euVATrate: false,
            geoplugin_continentCode: geo.data.continent_code || "",
            geoplugin_continentName: geo.data.continent_name || "",
            geoplugin_latitude: geo.data.latitude?.toString() || "",
            geoplugin_longitude: geo.data.longitude?.toString() || "",
            geoplugin_locationAccuracyRadius: "20",
            geoplugin_timezone: geo.data.timezone || "",
            geoplugin_currencyCode: geo.data.currency || "",
            geoplugin_currencySymbol: null,
            geoplugin_currencySymbol_UTF8: "",
            geoplugin_currencyConverter: 5.6727 // Static or fetch from forex API
        };

        res.json(response);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Failed to fetch location data' });
    }
});

app.listen(PORT, () => {
    console.log(`GeoPlugin-style API running at http://localhost:${PORT}/json.gp`);
});
