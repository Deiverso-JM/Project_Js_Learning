const { defineConfig } = require("cypress");

module.exports = defineConfig({
  "viewportHeight": 1500,
  "viewportWidth": 1800,

  
  projectId: 'n3391p',
  e2e: {
    "baseUrl":'http://127.0.0.1:5500',
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    
    testIsolation:false,
  },




});
