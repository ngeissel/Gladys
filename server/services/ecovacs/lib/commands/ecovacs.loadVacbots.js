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
    const external_id = device.external_id;
    const vacbot = await this.getVacbotObj(external_id);
    this.listen(vacbot, device);
    this.vacbots.set(external_id, {device, vacbot});
    this.getDeviceMap(external_id, true);
  });
}

module.exports = {
  loadVacbots,
};
