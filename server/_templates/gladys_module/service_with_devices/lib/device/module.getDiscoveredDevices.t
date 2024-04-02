---
to: ./services/<%= module %>/lib/device/<%= module %>.getDiscoveredDevices.js
---
/**
 * @description Get all <%= module %> discovered devices.
 * @returns {*} Discovered devices.
 * @example
 * getDiscoveredDevices()
 */
function getDiscoveredDevices() {
  return this.discoveredDevices;
}

module.exports = {
  getDiscoveredDevices,
};