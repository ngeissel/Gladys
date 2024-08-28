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
  
  logger.trace(`mapImages`, vacbot.mapImages);
  logger.trace(`currentMapMID `, vacbot.currentMapMID);
  logger.trace(`deebotPosition `, vacbot.deebotPosition);
  logger.trace(`chargePosition `, vacbot.chargePosition);
  logger.trace(`mapDataObject `, vacbot.mapDataObject);
  if (vacbot.mapDataObject) {
    logger.trace(`mapDataObject `, vacbot.mapDataObject[0].mapImage.mapBase64PNG);
  
  }
    /*
  const type = 'ol';
  const img = await vacbot.mapImages[vacbot.currentMapMID][type].getBase64PNG(
    vacbot.deebotPosition, vacbot.chargePosition, vacbot.currentMapMID, vacbot.mapDataObject
);
logger.trace(img);
*/
  
  
  /*
  vacbot.maps: [
    EcovacsMap {
      mapID: '718414426',
      mapIndex: 2,
      mapName: '',
      mapStatus: 0,
      mapIsCurrentMap: true,
      mapIsBuilt: true
    }
  ]
}
*/
  
  // ERROR const vacbot = await this.getVacbotObj(device.external_id);
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
          }
        break;
        default:
          break;
      }
      // Retrieve states
      /*
      if (vacbot.hasMappingCapabilities()) {
        vacbot.run('GetChargerPos');
        vacbot.run('GetPosition');
      }
      */
      if (vacbot.hasMappingCapabilities()) {
        logger.trace(`GET MAPS.`);
        vacbot.run('GetMaps', true, true);
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
