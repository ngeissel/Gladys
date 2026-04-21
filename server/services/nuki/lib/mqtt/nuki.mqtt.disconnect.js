const logger = require('../../../../utils/logger');
const { DISCOVERY_TOPIC } = require('../utils/nuki.constants');

/**
 * @description Disconnect service from dependencies.
 * @example
 * nukiMQTTHandler.disconnect();
 */
async function disconnect() {
  logger.debug(`Call MQTT disconnect`);

  // Clear scan timeout if active
  if (this.scanTimeout) {
    clearTimeout(this.scanTimeout);
    this.scanTimeout = null;
  }

  const mqttService = this.nukiHandler.gladys.service.getService('mqtt');
  // Unsubscribe to Nuki topics
  mqttService.device.unsubscribe(DISCOVERY_TOPIC);
  // Unsubscribe devices topics
  const devices = await this.nukiHandler.gladys.device.get({ service: 'nuki' });
  devices.forEach((device) => {
    const topic = `nuki/${device.external_id.split(':')[1]}/#`;
    mqttService.device.unsubscribe(topic);
  });
}

module.exports = {
  disconnect,
};
