const Promise = require('bluebird');
const logger = require('../../../../utils/logger');
const { DEVICE_FEATURE_CATEGORIES, DEVICE_FEATURE_TYPES } = require('../../../../utils/constants');

/**
 *
 * @description Poll values of an ecovacs device.
 * @param {object} device - The device to poll.
 * @returns {Promise} Promise of nothing.
 * @example
 * poll(device);
 */
async function poll(device) {
  if (!this.connected) {
    await this.connect();
  }
  let vacbot;
  // get vacbot object TODO : improve this part (new util func ie: this.vacbots[device])
  this.vacbots.forEach((value, key) => {
    if (key.external_id === device.external_id) {
      vacbot = value;
    }
  });
  logger.trace(`Is Vacbot ready ? ${vacbot.is_ready}`);
  if (vacbot.is_ready) {
    await Promise.mapSeries(device.features || [], (feature) => {
      logger.debug(`Ecovacs: feature: ${JSON.stringify(feature)}`);
      switch (feature.category) {
        case DEVICE_FEATURE_CATEGORIES.BATTERY: // Integer
          if (feature.type === DEVICE_FEATURE_TYPES.VACBOT.INTEGER) {
            vacbot.run('GetBatteryState'); // retrieve the battery status. Answer : { value: 100, isLow: 0 }
          }
          break;
        default:
          break;
      }
    });
    // Retrieve states
    vacbot.run('GetCleanState'); // retrieve the cleaning status. Answer : { trigger: 'alert', state: 'idle' }
    vacbot.run('GetChargeState'); // retrieve the charging status. Answer : { isCharging: 1, mode: 'slot' }
    vacbot.run('GetSleepStatus'); // retrieve the sleep status. Answer : { enable: 1 }
  }

  // logger.trace(`POLL vacbot : `, vacbot);
  switch (vacbot.errorCode) {
    case '3': // String (see ecovacs-deebot.js/library/errorCodes.json)
      logger.error(`Error "${vacbot.errorCode}" occured : ${vacbot.errorDescription}.`);
      break;
    case '4200':
      logger.error(`Error "${vacbot.errorCode}" occured : ${vacbot.errorDescription}.`);
      this.connected = false;
      vacbot.disconnect();
      break;
    default:
      logger.debug(`Error code "${vacbot.errorCode}" : ${vacbot.errorDescription}.`);
      break;
  }
}

module.exports = {
  poll,
};
