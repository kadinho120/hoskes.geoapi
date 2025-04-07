module.exports = async (ip, location) => {
  const langMap = {
    'BR': { name: 'Portuguese', code: 'pt' },
    'US': { name: 'English', code: 'en' },
    'GB': { name: 'English', code: 'en' },
    'FR': { name: 'French', code: 'fr' },
    'ES': { name: 'Spanish', code: 'es' },
    'DE': { name: 'German', code: 'de' },
    'IT': { name: 'Italian', code: 'it' },
    'CN': { name: 'Chinese', code: 'zh' },
    'JP': { name: 'Japanese', code: 'ja' },
    'RU': { name: 'Russian', code: 'ru' },
    'IN': { name: 'Hindi', code: 'hi' },
    'AR': { name: 'Spanish', code: 'es' },
    'MX': { name: 'Spanish', code: 'es' },
    'KR': { name: 'Korean', code: 'ko' },
    'TR': { name: 'Turkish', code: 'tr' },
    'NL': { name: 'Dutch', code: 'nl' },
    'SE': { name: 'Swedish', code: 'sv' },
    'PL': { name: 'Polish', code: 'pl' },
    'ID': { name: 'Indonesian', code: 'id' },
    'IR': { name: 'Persian', code: 'fa' }
//Add more if needed
  };

  const lang = langMap[location.country_code] || { name: 'English', code: 'en' };

  return {
    hoskes_locplugin_language: lang.name,
    hoskes_locplugin_langcode: lang.code
  };
};
