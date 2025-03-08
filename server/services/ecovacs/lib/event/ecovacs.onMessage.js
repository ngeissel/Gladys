const logger = require('../../../../utils/logger');
const { EVENTS } = require('../../../../utils/constants');

const BATTERY_FEATURE_INDEX = 1;
const CLEAN_REPORT_FEATURE_INDEX = 2;
const MAP_FEATURE_INDEX = 3;

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
    case 'MapImageData':
      const imageMap = value.mapBase64PNG;
      logger.trace(`_______________________>>>>>>>>>>>>>>>>>>>>>>>>>>> Image  `, imageMap);
      this.gladys.event.emit(EVENTS.DEVICE.NEW_STATE_STRING, {
        device_feature_external_id: `${device.features[MAP_FEATURE_INDEX].external_id}`,
        state: imageMap,
      });
      // logger.trace(device);
      break;
    case 'Error':
      logger.error(`Error "${value}" occured on "${device.name}" `);
      break;
    
    /*
    case 'CleanLog':
      logger.trace(`CleanLog  ==> `, value);
      break;
    case 'onMapInfoxxxxx':
      logger.trace(`onMapInfo  ${value}`);
      break;
    case 'Position':
      logger.trace(`Position ${device} is ${value.x},${value.y}.`);
      break;
      
    case 'MapSpotAreaInfoxxxxxx':
      logger.trace('MapSpotAreaInfo: ' + JSON.stringify(area));
      break;
      
    case 'MapDataObjectxxxxx':
      logger.trace(`MapDataObject:`, value);
      
      const mapDataObject = value;
      let mapSpotAreaName = [];
      const mapData = Object.assign(mapDataObject[0]);
      for (let i = 0; i < mapData.mapSpotAreas.length; i++) {
          const mapSpotArea = mapData.mapSpotAreas[i];
          mapSpotAreaName[mapSpotArea.mapSpotAreaID] = mapSpotArea.mapSpotAreaName;
          logger.trace(`Area ${mapSpotArea.mapSpotAreaID} - ${mapSpotAreaName[mapSpotArea.mapSpotAreaID]}`);
      };
      logger.trace(`mapImage.mapBase64PNG :`, mapData.mapImage.mapBase64PNG);
      this.gladys.event.emit(EVENTS.DEVICE.NEW_STATE, {
        device_feature_external_id: `${device.features[MAP_FEATURE_INDEX].external_id}`,
        state: mapData.mapImage.mapBase64PNG,
      });
      break;
    case 'CurrentMapNamexxxxx':
      logger.trace(`CurrentMapName  ${value}`);
      break;
    case 'CurrentSpotAreasxxxxxx':
      logger.trace(`CurrentSpotAreas  ${value}`);
      break;
    */
    default:
      logger.info(`Event ${type} with value "${value}" is not handled yet.`);
  }
}
module.exports = {
  onMessage,
};
