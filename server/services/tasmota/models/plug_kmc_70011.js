const { DEVICE_FEATURE_CATEGORIES, DEVICE_FEATURE_TYPES } = require('../../../utils/constants');
const { getFeature } = require('./features');

const getModel = () => {
  return 'kmc-70011';
};

const getLabel = () => {
  return 'KMC 70011';
};

const getFeatures = (externalId) => {
  return [
    getFeature(DEVICE_FEATURE_CATEGORIES.SWITCH, DEVICE_FEATURE_TYPES.SWITCH.BINARY, `Switch`, externalId),
    getFeature(DEVICE_FEATURE_CATEGORIES.SWITCH, DEVICE_FEATURE_TYPES.SWITCH.VOLTAGE, `Voltage`, externalId),
    getFeature(DEVICE_FEATURE_CATEGORIES.SWITCH, DEVICE_FEATURE_TYPES.SWITCH.ENERGY, `Energy`, externalId),
    getFeature(DEVICE_FEATURE_CATEGORIES.SWITCH, DEVICE_FEATURE_TYPES.SWITCH.POWER, `Power`, externalId),
  ];
};

module.exports = {
  getFeatures,
  getModel,
  getLabel,
};
