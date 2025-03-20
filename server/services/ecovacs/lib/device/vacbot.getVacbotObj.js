const logger = require('../../../../utils/logger');
const { parseExternalId } = require('../utils/ecovacs.externalId');
const { VacbotWrapper, getMap } = require('./vacbot');

/**
 * @description Retrieve from ecovacs service, the vacbot corresponding to the given device external id.
 * @param {string} deviceExternalId - The deviceExternalId to control.
 * @returns {Promise<object>} Promise object representing the vacbot object from ecovacs lib.
 * @example
 * vacbot.getVacbotObj(external_id);
 */
async function getVacbotObj(deviceExternalId) {
  
  if (!this.connected) {
    await this.connect();
  }
  
  const { deviceNumber } = parseExternalId(deviceExternalId);
  const devices = await this.ecovacsClient.devices();
  const vacuum = devices[deviceNumber];
  const vacbotObj = this.ecovacsClient.getVacBotObj(vacuum);
  return vacbotObj;
}

module.exports = {
  getVacbotObj,
};
