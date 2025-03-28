const logger = require('../../../../utils/logger');

/**
 * @description Load vacbot device.
 * @example
 * ecovacs.loadVacbots();
 */
async function loadVacbots() {
  logger.debug(`Ecovacs: Loading Vacbots`);

  // Load all vacbot registered in gladys
  const registered = await this.gladys.device.get({
    service_id: this.serviceId,
  });
  registered.forEach(async (device) => {
    const externalId = device.external_id;
    const vacbot = await this.getVacbotObj(externalId);
    this.listen(vacbot, device);
    this.vacbots.set(externalId, { device, vacbot });
  });
}

module.exports = {
  loadVacbots,
};
