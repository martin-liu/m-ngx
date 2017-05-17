// Base configuration of application, `config.ENV.ts` will override this configuration
export const Config = {
  production: false,

  name: "app",
  title: "My App",

  uri: {
    api: "api/"
  },

  "default": {
    displayCount: 20
  },

  piwik: {
    enabled: false,
    app: 'appName',
    prod: 'prodName',
    url: '',
    siteId: 0
  },

  intro: {
    enabled: false
  },

  PFSSO: {
    enabled: true
  },

  urlHtml5Mode: true,
  version: "0.0.1"
};
