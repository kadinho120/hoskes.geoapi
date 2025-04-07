module.exports = async (ip, location) => {
  const langMap = {
    'BR': 'Portuguese',
    'US': 'English',
    'FR': 'French',
    'ES': 'Spanish',
    'DE': 'German',
    // Add more mappings as needed
  };

  return {
    hoskes_locplugin_language: langMap[location.country_code] || 'English'
  };
};
