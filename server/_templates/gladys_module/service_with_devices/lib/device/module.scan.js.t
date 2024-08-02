---
to: ./services/<%= module %>/lib/device/<%= module %>.scan.js
---
const { convertToGladysDevice } = require('../utils/<%= module %>.convertToGladysDevice');
const { WEBSOCKET_MESSAGE_TYPES } = require('../../../../utils/constants');

/**
 * @description Force scanning for devices.
 * @returns {*} Discovered devices.
 * @example
 * scan();
 */
async function scan() {
  // TODO : Adapt ...
  const scanned = [
    {
      name: 'Sample one',
      uuid: 'uuid1',
    },
    {
      name: 'Sample two',
      uuid: 'uuid2',
    },
  ];
  
  // Convert root device to gladys format
  const discovered = scanned.map((d) =>
    convertToGladysDevice(this.serviceId, {
      name: d.name,
      uuid: d.uuid,
    }),
  );

  // Get only unknow devices (not yet registered in gladys)
  const registered = await this.gladys.device.get({ service_id: this.service_id });
  const unknownDevices = discovered
    ? discovered.filter((d) => !registered.find((e) => e.external_id === d.external_id))
    : [];
  this.discoveredDevices = unknownDevices;

  this.notifyNewDevice(this.discoveredDevices, WEBSOCKET_MESSAGE_TYPES.<%= constName %>.NEW_DEVICE);
  logger.debug(`Newly discovered devices : `, this.discoveredDevices);
  return this.discoveredDevices;
}

module.exports = {
  scan,
};