---
to: ./services/<%= module %>/lib/device/<%= module %>.getDiscoveredDevices.js
---
/**
 * @description Get all <%= module %> discovered devices.
 * @returns {Array} Return list of devices.
 * @example
 * getDiscoveredDevices()
 */
function getDiscoveredDevices() {
  return this.discoveredDevices;
}

module.exports = {
  getDiscoveredDevices,
};