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
  logger.trace('<======================== POLL ===========================================>');
  const service = await this.gladys.service.getByName('ecovacs');
  if (service.status === 'STOPPED') {
    // service is not started, do not poll the device
    return;
  }
  if (!this.connected) {
    await this.connect();
  }
  const vacbot = this.getVacbotFromExternalId(device.external_id);
  
  
  
  if (vacbot.is_ready) {
    await Promise.mapSeries(device.features || [], (feature) => {
      switch (feature.category) {
        case DEVICE_FEATURE_CATEGORIES.BATTERY: // Integer
          if (feature.type === DEVICE_FEATURE_TYPES.VACBOT.INTEGER) {
            vacbot.run('GetBatteryState'); // retrieve the battery status. Answer : { value: 100, isLow: 0 }
          }
          break;
        case DEVICE_FEATURE_CATEGORIES.VACBOT: // Integer
          if (feature.type === DEVICE_FEATURE_TYPES.VACBOT.CLEAN_REPORT) {
            vacbot.run('GetCleanState'); // retrieve the cleaning status. Answer : { trigger: 'alert', state: 'idle' }
            vacbot.run('GetChargeState'); // retrieve the charging status. Answer : { isCharging: 1, mode: 'slot' }
            vacbot.run('GetSleepStatus'); // retrieve the sleep status. Answer : { enable: 1 }

            /* WIP */
            vacbot.run('GetCleanLogs');
            
          }
          if (feature.type === DEVICE_FEATURE_TYPES.VACBOT.MAP) {
            vacbot.getMap();
          }
        break;
        default:
          break;
      }
      
      
    });
  }
  switch (vacbot.errorCode) {
    // String (see ecovacs-deebot.js/library/errorCodes.json)
    case '3': //  "RequestOAuthError: Authentication error"
      logger.error(`Error "${vacbot.errorCode}" occured : ${vacbot.errorDescription}.`);
      this.connected = false;
      logger.info(`Force reconnect after RequestOAuthError`);
      await this.connect();
      break;
    case '4200': // "Robot not reachable"
      logger.error(`Error "${vacbot.errorCode}" occured : ${vacbot.errorDescription}.`);
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
