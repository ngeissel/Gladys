const logger = require('../../../../utils/logger');

/**
 * @description Vacbot device post creation action : Load devices and connect.
 * @param {object} device - The created device.
 * @example
 * postCreate(device)
 */
function postCreate(device) {
  this.loadVacbots();
}

module.exports = {
  postCreate,
};
