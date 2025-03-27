const Promise = require('bluebird');
const logger = require('../../../../utils/logger');
const { convertToGladysDevice } = require('../utils/ecovacs.convertToGladysDevice');

/**
 * @description Retrieve ecovacs devices from cloud.
 * @returns {Promise<Array<object>>} Resolve with array of new devices.
 * @example
 * vacbot.discover();
 */
async function discover() {
  logger.debug('Discover ecovacs devices from cloud');
  if (!this.connected) {
    await this.connect();
  }
  const scanned = await this.ecovacsClient.devices();
  const discovered = await Promise.all(scanned.map(async (d) => convertToGladysDevice(this, d)));
  const registered = await this.gladys.device.get({ service_id: this.service_id });
  const unknownDevices = discovered
    ? discovered.filter((d) => !registered.find((e) => e.external_id === d.external_id))
    : [];
  return unknownDevices;
}

module.exports = {
  discover,
};
