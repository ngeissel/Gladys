const logger = require('../../../../utils/logger');
const { addSelector } = require('../../../../utils/addSelector');
const { DEVICE_PARAM_NAME, DEVICE_PARAM_VALUE } = require('../utils/nuki.constants');
const { EVENTS } = require('../../../../utils/constants');

const {
  DEVICE_FEATURE_CATEGORIES,
  DEVICE_FEATURE_TYPES,
  DEVICE_FEATURE_UNITS,
} = require('../../../../utils/constants');


/**
 * @description Discover Nuki devices through MQTT.
 * @example
 * nuki.convertToDevice();
 */
async function convertToDevice(message) {
  /*
  {"~":"nuki/398172F4",
   "avty_t":"~/connected",
   "pl_avail":"true", 
   "pl_not_avail":"false",
   "dev":{"ids":"[398172F4]",
          "mf":"Nuki",
          "name":"Maison",
          "mdl":"Smart Lock 3.0 Pro"
         },
    "name":"Maison Lock 'n' Go with unlatch",
    "uniq_id":"398172F4_lock_n_go_unlatch_button",
    "cmd_t":"~/lockAction",
    "pl_prs":"5"}
  */
  // Subscribe to Tasmota
  const config = JSON.parse(message);

  const deviceExternalId = config.dev.ids.replace(/[\[\]']+/g,'');
  logger.trace(`Id ${deviceExternalId} `);
  delete this.discoveredDevices[deviceExternalId];

  const friendlyName = config.dev.mdl;
  const nukiModel = config.dev.mdl;
  const externalId = `nuki:${deviceExternalId}`;
  const device = {
    name: friendlyName,
    external_id: externalId,
    selector: externalId,
    features: [],
    model: nukiModel,
    service_id: this.nukiHandler.serviceId,
    should_poll: false,
    params: [
      {
        name: DEVICE_PARAM_NAME.PROTOCOL,
        value: DEVICE_PARAM_VALUE[DEVICE_PARAM_NAME.PROTOCOL].MQTT,
      },
    ],
  };
  addSelector(device);
  
  // battery
  device.features.push({
    name: 'battery',
    selector: `nuki:${externalId}:battery`,
    external_id: `nuki:${externalId}:battery`,
    category: DEVICE_FEATURE_CATEGORIES.BATTERY,
    type: DEVICE_FEATURE_TYPES.LOCK.INTEGER,
    unit: DEVICE_FEATURE_UNITS.PERCENT,
    read_only: true,
    keep_history: true,
    has_feedback: true,
    min: 0,
    max: 100,
  });

  // lock button
  device.features.push({
    name: 'lock',
    selector: `nuki:${externalId}:button`,
    external_id: `nuki:${externalId}:button`,
    category: DEVICE_FEATURE_CATEGORIES.LOCK,
    type: DEVICE_FEATURE_TYPES.LOCK.BINARY,
    read_only: false,
    keep_history: true,
    has_feedback: true,
    min: 0,
    max: 1,
  });

  return device;
}

module.exports = {
  convertToDevice,
};