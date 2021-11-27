const get = require('get-value');
/**
 * @description Get Device param by name.
 * @param {Object} device - Device Object to parse.
 * @param {string} paramName - The name of the param to get.
 * @returns {string} Return param.
 * @example
 * const value = getDeviceParam({
 *  params: [{ name: 'test', value: 1 }]
 * }, 'test');
 */
function getDeviceParam(device, paramName) {
  if (!get(device, 'params')) {
    return null;
  }
  const param = device.params.find((oneParam) => oneParam.name === paramName);
  if (param) {
    return param.value;
  }
  return null;
}

/**
 * @description Set Device param by name.
 * @param {Object} device - Device Object to parse.
 * @param {string} paramName - The name of the param to get.
 * @param {string} newValue - The value to set.
 * @example
 * setDeviceParam({
 *  params: [{ name: 'test', value: 1 }]
 * }, 'test', 'new-value');
 */
function setDeviceParam(device, paramName, newValue) {
  if (!device.params) {
    device.params = [];
  }
  const param = device.params.find((oneParam) => oneParam.name === paramName);
  if (param) {
    param.value = newValue;
  } else {
    device.params.push({
      name: paramName,
      value: newValue,
    });
  }
  return null;
}

/**
 * @description Get Device param by name.
 * @param {Object} device - Device Object to parse.
 * @param {string} category - The category of the feature to get.
 * @param {string} type - The type of the feature to get.
 * @returns {Object} Return feature.
 * @example
 * const value = getDeviceFeature({
 *  features: [{ category: 'light', type: 'binary' }]
 * }, 'light', 'binary');
 */
function getDeviceFeature(device, category, type) {
  if (!get(device, 'features')) {
    return null;
  }
  const feature = device.features.find((oneFeature) => oneFeature.category === category && oneFeature.type === type);
  if (feature) {
    return feature;
  }
  return null;
}

const matchFeature = (features, feature) => {
  return features.findIndex((f) => f.external_id === feature.external_id);
};

const matchParam = (params, param) => {
  return params.findIndex((p) => p.name === param.name && p.value === param.value);
};

/**
 * @description Compares both argument devices and check if any changes occurred on following attributes:
 *  - features: check for added or deleted features (based only on external_id)
 *  - params: check for added, updated or deleted (based on name and value)
 *
 * @param {Object} newDevice - New device.
 * @param {Object} existingDevice - Existing device.
 * @returns {boolean} Indicates if the new device is different from the existing one.
 * @example
 * hasDeviceChanged({ features: [(3)], params: [ ... ]}, { features: [(0)], params: [ ... ]})
 */
function hasDeviceChanged(newDevice, existingDevice = {}) {
  const { features, params } = newDevice;
  const existingFeatures = existingDevice.features || [];
  const existingParams = existingDevice.params || [];

  let deviceChanged = existingFeatures.length !== features.length || existingParams.length !== params.length;
  let i = 0;
  while (!deviceChanged && features[i]) {
    deviceChanged = matchFeature(existingFeatures, features[i]) < 0;
    i += 1;
  }

  i = 0;
  while (!deviceChanged && params[i]) {
    deviceChanged = matchParam(existingParams, params[i]) < 0;
    i += 1;
  }

  return deviceChanged;
}

module.exports = {
  getDeviceParam,
  setDeviceParam,
  getDeviceFeature,
  hasDeviceChanged,
};
