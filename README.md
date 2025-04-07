# 📍 Hoskes LocPlugin API

**A lightweight, open-source IP geolocation API powered by MaxMind and built for the community.**

🟣 **Live URL:** [https://hoskes-geoapi.onrender.com/json.gp](https://hoskes-geoapi.onrender.com/json.gp)  
📦 **License:** MIT  
🤝 **Open for contributions and issues**

---

## 🔧 Features

- 🌍 IP-based location lookup using MaxMind GeoLite2
- ⚡ Fast response time with accurate delay reporting
- 🔌 Plugin support via `?plugins=plugin1,plugin2` in the URL
- ✅ Currently supported plugins:
  - `weather`: Current weather based on coordinates
  - `language`: Primary language based on country

---

## 🚀 Getting Started

```bash
git clone https://github.com/your-username/hoskes-geoapi.git
cd hoskes-geoapi
npm install
```

Make sure you have `GeoLite2-City.mmdb` in the project root. You can get it from [MaxMind's website](https://dev.maxmind.com/geoip/geolite2-free-geolocation-data).

```bash
node index.js
```

Access via:  
`http://localhost:3000/json.gp?plugins=weather,language`

---

## 🔌 Plugins System

Plugins run only if requested via query string:

```bash
/json.gp?plugins=weather,language
```

Each plugin enriches the JSON response. Plugins are modular and stored in `/plugins`.

---

## ✨ Example Response

```json
{
  "hoskes_locplugin_request": "179.172.163.15",
  "hoskes_locplugin_status": 200,
  "hoskes_locplugin_delay": "3.35ms",
  "hoskes_locplugin_city": "Belo Horizonte",
  "hoskes_locplugin_countryName": "Brazil",
  "hoskes_locplugin_weather": "30°C ☀️",
  "hoskes_locplugin_language": "Portuguese"
}
```

---

## 🤝 Contributing

- Submit issues freely
- Create pull requests at any time
- Add your own plugin in `/plugins` and PR!

This project was made for the community 💜