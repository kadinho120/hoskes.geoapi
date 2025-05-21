# 📍 Hoskes LocPlugin API

**A **free**, **lightweight**, **open source**, GeoPlugin-style IP geolocation API built with 💙 for the community.**

🟣 **Live URL:** [https://geoapi-hoskes.onrender.com/json.gp](https://geoapi-hoskes.onrender.com/json.gp)  
📦 **License:** MIT  
🤝 **Open for contributions and issues**

---

## 🚀 How It Works
 
 This API detects the **network IP** of the requester and returns detailed geographic information, including:
 - City
 - Region
 - Country
 - Continent
 - Latitude & Longitude
 - Timezone
 - ...and more!	
 ---
 - 🌍 IP-based location lookup using MaxMind GeoLite2
 - ⚡ Fast response time with accurate delay reporting
 - 🔌 Plugin support via `?plugins=plugin1,plugin2` in the URL
 - ✅ Currently supported plugins:
   - `weather`: Current weather based on coordinates
   - `language`: Primary language based on country
   
Access via GET: 
```bash
 https://geoapi-hoskes.onrender.com/json.gp
```


---
## ✨ Example Response

```json
{
  "hoskes_locplugin_request": "178.238.10.15",
  "hoskes_locplugin_status": 200,
  "hoskes_locplugin_delay": "0.45ms",
  "hoskes_locplugin_credit": "Returned data includes GeoLite2 data created by MaxMind, available from \u003Ca href='https://www.maxmind.com'\u003Ehttps://www.maxmind.com\u003C/a\u003E.",
  "hoskes_locplugin_city": "Canary Wharf",
  "hoskes_locplugin_region": "England",
  "hoskes_locplugin_regionCode": "ENG",
  "hoskes_locplugin_regionName": "England",
  "hoskes_locplugin_countryCode": "GB",
  "hoskes_locplugin_countryName": "United Kingdom",
  "hoskes_locplugin_inEUunion": 0,
  "hoskes_locplugin_continentCode": "EU",
  "hoskes_locplugin_continentName": "Europe",
  "hoskes_locplugin_latitude": "51.5064",
  "hoskes_locplugin_longitude": "-0.02",
  "hoskes_locplugin_locationAccuracyRadius": "20",
  "hoskes_locplugin_timezone": "Europe/London"
}
```

## 🔌 Plugins System

Plugins run only if requested via query string:

```bash
/json.gp?plugins=weather,language
```

Each plugin enriches the JSON response. Plugins are modular and stored in `/plugins`.

---

## ✨ Example Response With Plugins

```json
{
  "hoskes_locplugin_request": "179.172.163.15",
  ...
  "hoskes_locplugin_weather": "30°C ☀️", //Weather plugin
  "hoskes_locplugin_language": "English", //Language plugin
  "hoskes_locplugin_langcode": "en" //Language plugin
}
```

---

## 🧠 Built With
 
 - Node.js + Express
 - MaxMind GeoLite2 database
 - `request-ip` for IP extraction
 
 ---
## 🛠️ How to Use (For devs)
 
 1. Clone this repo:
    ```bash
    git clone https://github.com/matheushoske/hoskes.geoapi.git
    ```
 
 2. Download the [GeoLite2-City.mmdb](https://dev.maxmind.com/geoip/geolite2-free-geolocation-data) and replace it in the project root (optional [For updated data]).
 
 3. Install dependencies:
    ```bash
    npm install
    ```
	```bash
	node index.js
	```
 Access via:  
 `http://localhost:3000/json.gp?plugins=weather,language`


## 📄 License
 
 This project is licensed under the [MIT License](LICENSE).
 
 ---
 
 ## 🙏 Credit
 
 - Geo data provided by [MaxMind GeoLite2](https://www.maxmind.com).

## 🤝 Contributing

- Submit issues freely
- Create pull requests at any time
- Add your own plugin in `/plugins` and PR!

Made with ❤️ by [@matheushoske](https://github.com/matheushoske) for the community 💜
