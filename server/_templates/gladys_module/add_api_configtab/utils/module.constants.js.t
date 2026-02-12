---
to: ./services/<%= module %>/lib/utils/<%= module %>.constants.js
---
const CONFIGURATION = {
  <%= constName %>_API_KEY: '<%= constName %>_API_KEY',
};

const DEVICE_EXTERNAL_ID_BASE = '<%= module %>';

module.exports = {
  DEVICE_EXTERNAL_ID_BASE,
  CONFIGURATION,
};
