const { expect } = require('chai');

const models = require('../../../../services/tasmota/models');
const { DEVICE_FEATURE_CATEGORIES, DEVICE_FEATURE_TYPES } = require('../../../../utils/constants');

const modelId = 29;

describe('TasmotaService - Model - Sonoff T1 2Ch', () => {
  it('get model for Sonoff T1 2Ch', () => {
    const model = models[modelId].getModel();

    expect(model).to.eq('sonoff-t1-2ch');
  });

  it('get label for Sonoff T1 2Ch', () => {
    const label = models[modelId].getLabel();

    expect(label).to.eq('Sonoff T1 2Ch');
  });

  it('get features for Sonoff T1 2Ch', () => {
    const features = models[modelId].getFeatures('device_external_id');

    expect(features).to.deep.eq([
      {
        name: 'Switch 1',
        external_id: 'device_external_id:switch:binary:1',
        selector: 'device-external-id-switch-binary-1',
        category: DEVICE_FEATURE_CATEGORIES.SWITCH,
        type: DEVICE_FEATURE_TYPES.SWITCH.BINARY,
        read_only: false,
        has_feedback: true,
        min: 0,
        max: 1,
      },
      {
        name: 'Switch 2',
        external_id: 'device_external_id:switch:binary:2',
        selector: 'device-external-id-switch-binary-2',
        category: DEVICE_FEATURE_CATEGORIES.SWITCH,
        type: DEVICE_FEATURE_TYPES.SWITCH.BINARY,
        read_only: false,
        has_feedback: true,
        min: 0,
        max: 1,
      },
    ]);
  });
});
