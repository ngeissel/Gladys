const logger = require('../../../../utils/logger');
const { EVENTS } = require('../../../../utils/constants');

const BATTERY_FEATURE_INDEX = 1;
const CLEAN_REPORT_FEATURE_INDEX = 2;

/**
 * @description Ecovacs onMessage callback.
 * @param {string} type - Type of event.
 * @param {object} device - Concerned Gladys device.
 * @param {any} value - Value from event.
 * @example
 * vacbot.onMessage('BatteryInfo', device, 100);
 */
function onMessage(type, device, value) {
  logger.trace(`MESSAGE ->>>>>>>>>>>>>>>>>>>>>>>>>> ${type}`);
  switch (type) {
    case 'ready':
      logger.info(`${device.name} is ready.`);
    case 'BatteryInfo':
      this.gladys.event.emit(EVENTS.DEVICE.NEW_STATE, {
        device_feature_external_id: `${device.features[BATTERY_FEATURE_INDEX].external_id}`,
        state: Math.round(value),
      });
      break;
    case 'CleanReport':
      this.gladys.event.emit(EVENTS.DEVICE.NEW_STATE, {
        device_feature_external_id: `${device.features[CLEAN_REPORT_FEATURE_INDEX].external_id}`,
        text: value,
      });
      break;
    case 'onMapInfo':
      logger.trace(`onMapInfo  ${value}`);
      break;
    case 'Position':
      logger.trace(`Position ${device} is ${value.x},${value.y}.`);
      break;
    case 'MapImage':
      logger.trace(`_______________________>>>>>>>>>>>>>>>>>>>>>>>>>>> Image  ${value.mapBase64PNG}`);
      break;
    case 'MapDataObject':
      logger.trace(`MapDataObject  ${value}`);
      const mapDataObject = value;
      let mapSpotAreaName = [];
      const mapData = Object.assign(mapDataObject[0]);
      for (let i = 0; i < mapData.mapSpotAreas.length; i++) {
          const mapSpotArea = mapData.mapSpotAreas[i];
          mapSpotAreaName[mapSpotArea.mapSpotAreaID] = mapSpotArea.mapSpotAreaName;
          logger.trace(`Area ${mapSpotArea.mapSpotAreaID} - ${mapSpotAreaName[mapSpotArea.mapSpotAreaID]}`);
      };
      break;
    case 'CurrentMapName':
      logger.trace(`CurrentMapName  ${value}`);
      break;
    case 'CurrentSpotAreas':
      logger.trace(`CurrentSpotAreas  ${value}`);
      break;
    case 'Error':
        logger.error(`Error occured on ${device} : ${value}`);
        break;
    default:
      logger.info(`Event ${type} with value "${value}" is not handled yet.`);
  }
}
module.exports = {
  onMessage,
};
