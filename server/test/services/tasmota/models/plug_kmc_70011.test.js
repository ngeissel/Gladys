const { expect } = require('chai');

const models = require('../../../../services/tasmota/models');
const {
  DEVICE_FEATURE_CATEGORIES,
  DEVICE_FEATURE_TYPES,
  DEVICE_FEATURE_UNITS,
} = require('../../../../utils/constants');

const modelId = 36;

describe('TasmotaService - Model - KMC 70011', () => {
  it('get model for KMC 70011', () => {
    const model = models[modelId].getModel();

    expect(model).to.eq('kmc-70011');
  });

  it('get label for KMC 70011', () => {
    const label = models[modelId].getLabel();

    expect(label).to.eq('KMC 70011');
  });

  it('get features for KMC 70011', () => {
    const features = models[modelId].getFeatures('device_external_id');

    expect(features).to.deep.eq([
      {
        name: 'Switch',
        external_id: 'device_external_id:switch:binary',
        selector: 'device-external-id-switch-binary',
        category: DEVICE_FEATURE_CATEGORIES.SWITCH,
        type: DEVICE_FEATURE_TYPES.SWITCH.BINARY,
        read_only: false,
        has_feedback: true,
        min: 0,
        max: 1,
      },
      {
        name: 'Voltage',
        external_id: 'device_external_id:switch:voltage',
        selector: 'device-external-id-switch-voltage',
        category: DEVICE_FEATURE_CATEGORIES.SWITCH,
        type: DEVICE_FEATURE_TYPES.SWITCH.VOLTAGE,
        read_only: true,
        has_feedback: false,
        min: 0,
        max: 10000,
        unit: DEVICE_FEATURE_UNITS.VOLT,
      },
      {
        name: 'Energy',
        external_id: 'device_external_id:switch:energy',
        selector: 'device-external-id-switch-energy',
        category: DEVICE_FEATURE_CATEGORIES.SWITCH,
        type: DEVICE_FEATURE_TYPES.SWITCH.ENERGY,
        read_only: true,
        has_feedback: false,
        min: 0,
        max: 10000,
        unit: DEVICE_FEATURE_UNITS.AMPERE,
      },
      {
        name: 'Power',
        external_id: 'device_external_id:switch:power',
        selector: 'device-external-id-switch-power',
        category: DEVICE_FEATURE_CATEGORIES.SWITCH,
        type: DEVICE_FEATURE_TYPES.SWITCH.POWER,
        read_only: true,
        has_feedback: false,
        min: 0,
        max: 10000,
        unit: DEVICE_FEATURE_UNITS.KILOWATT,
      },
    ]);
  });
});
