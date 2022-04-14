module.exports = {
  pwa: {
    workboxOptions: {
      importWorkboxFrom: 'local',
    },
    name: 'Shift',
    themeColor: '#d7621d',
  },
  pluginOptions: {
    i18n: {
      locale: 'de-DE',
      fallbackLocale: 'en-US',
      localeDir: 'locales',
      enableInSFC: false,
    },
  },
}
