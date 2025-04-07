const axios = require('axios');

module.exports = async (ip, location) => {
  const { latitude, longitude } = location;

  if (!latitude || !longitude) return {};

  const apiKey = process.env.OPENWEATHER_API_KEY; // set this in your environment
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

  try {
    const response = await axios.get(url);
    const data = response.data;

    return {
      hoskes_locplugin_weather: {
        description: data.weather[0].description,
        temperature: data.main.temp,
        feels_like: data.main.feels_like,
        humidity: data.main.humidity,
      }
    };
  } catch (err) {
    console.error('Weather plugin failed:', err.message);
    return {};
  }
};
