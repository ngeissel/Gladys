const logger = require('../../../../../utils/logger');

/**
 * @description Get the vacbot current map.
 * @returns {Promise<object>} Promise object representing the current map image for the vacbot.
 * @example
 * vacbot.getMap();
 */
async function getMap(deviceExternalId, refresh=false) {
  logger.trace('DEBUUGGG GET MAP');
  
  const vacbot = this.getVacbotFromExternalId(deviceExternalId);

  if (refresh) {
      const mapID = vacbot.currentMapMID;
      logger.trace(`Ecovacs : currentMapMID = "${mapID}" `);
    
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
            //vacbot.run('GetVirtualBoundaries', mapID);
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
  }
  
  if (vacbot.mapDataObject) {
    const mapImage = vacbot.mapDataObject[0].mapImage.mapBase64PNG;
    logger.trace(`mapDataObject `, mapImage);
    return mapImage;
  }
  
  return '';
};

module.exports = {
  getMap,
};

  /*
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
  */
  
  /*
  const mapImage = vacbot.mapImages;
  
  logger.trace(`mapImages`, vacbot.mapImages);
  logger.trace(`currentMapMID `, vacbot.currentMapMID);
  logger.trace(`deebotPosition `, vacbot.deebotPosition);
  logger.trace(`chargePosition `, vacbot.chargePosition);
  logger.trace(`mapDataObject `, vacbot.mapDataObject);
  */