# 🌍 Hoskes GeoIP API

A **free**, **open source**, GeoPlugin-style IP geolocation API built with 💙 for the community.

Get the location of any IP using the URL:

```
https://hoskes-geoapi.onrender.com/json.gp
```

---

## 🚀 How It Works

This API detects the **network IP** of the requester and returns detailed geographic information, including:

- City
- Region
- Country
- Continent
- Latitude & Longitude
- Timezone
- Currency
- ...and more!

Example response:
```json
{
   "hoskes_locplugin_request":"212.84.160.87",
   "hoskes_locplugin_status":200,
   "hoskes_locplugin_delay":"0.31ms",
   "hoskes_locplugin_credit":"Returned data includes GeoLite2 data created by MaxMind, available from <a href='https://www.maxmind.com'>https://www.maxmind.com</a>.",
   "hoskes_locplugin_city":"Nottingham",
   "hoskes_locplugin_region":"England",
   "hoskes_locplugin_regionCode":"ENG",
   "hoskes_locplugin_regionName":"England",
   "hoskes_locplugin_countryCode":"GB",
   "hoskes_locplugin_countryName":"United Kingdom",
   "hoskes_locplugin_inEU":0,
   "hoskes_locplugin_continentCode":"EU",
   "hoskes_locplugin_continentName":"Europe",
   "hoskes_locplugin_latitude":"52.9922",
   "hoskes_locplugin_longitude":"-1.233",
   "hoskes_locplugin_locationAccuracyRadius":"50",
   "hoskes_locplugin_timezone":"Europe/London",
   "hoskes_locplugin_currencyCode":"BRL"
}
```

---

## 🧠 Built With

- Node.js + Express
- MaxMind GeoLite2 database
- `request-ip` for IP extraction

---

## 🛠️ How to Use

1. Clone this repo:
   ```bash
   git clone https://github.com/matheushoske/hoskes.geoapi.git
   ```

2. Download the [GeoLite2-City.mmdb](https://dev.maxmind.com/geoip/geolite2-free-geolocation-data) and replace it in the project root (optional [For updated data]).

3. Install dependencies:
   ```bash
   npm install
   ```

4. Run locally:
   ```bash
   node index.js
   ```

5. Visit:
   ```
   http://localhost:3000/json.gp
   ```

---

## 🤝 Contributing

We welcome all kinds of contributions — bug fixes, improvements, documentation, and more.

- 👉 **Open an Issue** if you find bugs or have ideas.
- 👉 **Make a Pull Request** if you’d like to contribute code.

This project exists **for the community** and is powered by contributors like you!

---

## 🌐 Live Endpoint

**Try it now**:
```
https://hoskes-geoapi.onrender.com/json.gp
```

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

---

## 🙏 Credit

- Geo data provided by [MaxMind GeoLite2](https://www.maxmind.com).

---

Made with ❤️ by [@matheushoske](https://github.com/matheushoske)