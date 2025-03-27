const logger = require('../../../../utils/logger');

/**
 * @description Get Vacbot Obj from Gladys device external Id.
 * @param {string} externalId - Gladys device external_id.
 * @returns {object} Vacbot object.
 * @example
 * vacbot.getVacbotFromExternalId(external_id);
 */
function getVacbotFromExternalId(externalId) {
  logger.debug(`Vacbot: Get Vacbot Obj from Gladys device external Id`);
  const { vacbot } = this.vacbots.get(externalId);
  return vacbot;
}

module.exports = {
  getVacbotFromExternalId,
};
