const { DEVICE_FEATURE_TYPES } = require('../../../../utils/constants');
const { NotFoundError } = require('../../../../utils/coreErrors');
const logger = require('../../../../utils/logger');

/**
 * @description Change value of a Ecovacs Vacbot.
 * @param {object} device - The device to control.
 * @param {object} deviceFeature - The binary deviceFeature to control.
 * @param {number} value - The new value.
 * @example
 * setValue(device, deviceFeature, value);
 */
async function setValue(device, deviceFeature, value) {
  logger.debug(`Changing state of vacbot ${device.external_id} - ${deviceFeature.type} with value = ${value}`);
  const vacbot = await this.getVacbotObj(device.external_id);

  if (!vacbot) {
    throw new NotFoundError(`ECOVACS_API_NOT_FOUND`);
  }

  switch (deviceFeature.type) {
    case DEVICE_FEATURE_TYPES.VACBOT.STATE:
      if (value === 1) {
        vacbot.clean();
      } else if (value === 0) {
        vacbot.pause();
      } else if (value === -1) {
        vacbot.stop();
      } else if (value === 2) {
        vacbot.charge();
      }
      break;
    case DEVICE_FEATURE_TYPES.VACBOT.MAP:
      logger.trace(`Ecovacs : RUN MAP = "${value}" `);
      
      // const mapID = '718414426';
      const mapID = vacbot.currentMapMID;
      setTimeout(() => {
       
        if (vacbot.hasMappingCapabilities()) {
            vacbot.run('GetChargerPos');
            vacbot.run('GetPosition');
            vacbot.run('GetMaps', true, true);
            vacbot.run('GetMapImage', mapID, 'outline');  
            // vacbot.run("GetMaps");
        }
      }, 3000);

      logger.trace(`Ecovacs EVENT : on MAPS`);
      let mapData = null;
      let mapSpotAreaName = [];

      vacbot.on('MapDataObject', (mapDataObject) => {
        mapData = Object.assign(mapDataObject[0]);
        for (let i = 0; i < mapData.mapSpotAreas.length; i++) {
            const mapSpotArea = mapData.mapSpotAreas[i];
            mapSpotAreaName[mapSpotArea.mapSpotAreaID] = mapSpotArea.mapSpotAreaName;
        }
      });


      vacbot.on('Maps', (maps) => {
        console.log('Maps: ' + JSON.stringify(maps));
        for (const i in maps['maps']) {
            const mapID = maps['maps'][i]['mapID'];
            vacbot.run('GetSpotAreas', mapID);
            vacbot.run('GetVirtualBoundaries', mapID);
        }
      });
      
      logger.trace(`Ecovacs EVENT : on MapSpotAreas`);
      vacbot.on('MapSpotAreas', (spotAreas) => {
          logger.trace(`MapSpotAreas EVENT : `, JSON.stringify(spotAreas));
          console.log('MapSpotAreas: ' + JSON.stringify(spotAreas));
          for (const i in spotAreas['mapSpotAreas']) {
              const spotAreaID = spotAreas['mapSpotAreas'][i]['mapSpotAreaID'];
              vacbot.run('GetSpotAreaInfo', spotAreas['mapID'], spotAreaID);
          }
      });
      
      vacbot.on('MapSpotAreaInfo', (area) => {
          console.log('MapSpotAreaInfo: ' + JSON.stringify(area));
      });
      
      vacbot.on('MapVirtualBoundaries', (virtualBoundaries) => {
          console.log('MapVirtualBoundaries: ' + JSON.stringify(virtualBoundaries));
          const mapID = virtualBoundaries['mapID'];
          const virtualBoundariesCombined = [...virtualBoundaries['mapVirtualWalls'], ...virtualBoundaries['mapNoMopZones']];
          const virtualBoundaryArray = [];
          for (const i in virtualBoundariesCombined) {
              virtualBoundaryArray[virtualBoundariesCombined[i]['mapVirtualBoundaryID']] = virtualBoundariesCombined[i];
          }
          for (const i in virtualBoundaryArray) {
              const mapVirtualBoundaryID = virtualBoundaryArray[i]['mapVirtualBoundaryID'];
              const mapVirtualBoundaryType = virtualBoundaryArray[i]['mapVirtualBoundaryType'];
              vacbot.run('GetVirtualBoundaryInfo', mapID, mapVirtualBoundaryID, mapVirtualBoundaryType);
          }
      });
      
      vacbot.on('MapVirtualBoundaryInfo', (virtualBoundary) => {
          console.log('MapVirtualBoundaryInfo: ' + JSON.stringify(virtualBoundary));
      });

      /*
      logger.trace(`mapImages`, vacbot.mapImages);
      logger.trace(`currentMapMID `, vacbot.currentMapMID);
      logger.trace(`deebotPosition `, vacbot.deebotPosition);
      logger.trace(`chargePosition `, vacbot.chargePosition);
      logger.trace(`mapDataObject `, vacbot.mapDataObject);
      if (vacbot.mapDataObject) {
        logger.trace(`mapDataObject `, vacbot.mapDataObject[0].mapImage.mapBase64PNG);
      
      }*/
      break;  
    default:
      logger.info(`Ecovacs : Feature type = "${deviceFeature.type}" not handled`);
      break;
  }
}

module.exports = {
  setValue,
};
