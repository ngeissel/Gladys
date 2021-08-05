const { DEVICE_FEATURE_CATEGORIES, DEVICE_FEATURE_TYPES } = require('../../../../utils/constants');

const DEVICES = [
  {
    id: '86aa7',
    switch: 'switch',
    service_id: 'a810b8db-6d04-4697-bed3-c4b72c996279',
    name: `Prise `,
    selector: `rflink:86aa7:11`,
    external_id: `rflink:86aa7:11`,
    model: 'Tristate',
    should_poll: false,
    features: [
      {
        name: 'switch',
        selector: `rflink:86aa7:switch:11`,
        external_id: `rflink:86aa7:switch:11`,
        rfcode: 'CMD',
        category: DEVICE_FEATURE_CATEGORIES.SWITCH,
        type: DEVICE_FEATURE_TYPES.SENSOR.BINARY,
        read_only: false,
        keep_history: true,
        has_feedback: false,
        min: 0,
        max: 1,
      },
    ],
  },
  {
    id: '86aa70',
    switch: 'switch',
    service_id: 'a810b8db-6d04-4697-bed3-c4b72c996279',
    name: `Prise `,
    selector: `rflink:86aa70:10`,
    external_id: `rflink:86aa70:10`,
    model: 'Tristate',
    should_poll: false,
    features: [
      {
        name: 'switch',
        selector: `rflink:86aa70:switch:10`,
        external_id: `rflink:86aa70:switch:10`,
        rfcode: 'CMD',
        category: DEVICE_FEATURE_CATEGORIES.SWITCH,
        type: DEVICE_FEATURE_TYPES.SENSOR.BINARY,
        read_only: false,
        keep_history: true,
        has_feedback: false,
        min: 0,
        max: 1,
      },
    ],
  },
  {
    id: '86aa70',
    switch: 'switch',
    service_id: 'a810b8db-6d04-4697-bed3-c4b72c996279',
    name: `Prise `,
    selector: `rflink:86aa70:12`,
    external_id: `rflink:milight:86aa70:00`,
    model: 'Tristate',
    should_poll: false,
    features: [
      {
        name: 'Power',
        selector: `rflink:milight:86aa70:12:power`,
        external_id: `rflink:milight:86aa70:12:power`,
        rfcode: {
          value: 'CMD',
          cmd: 'ON',
        },
        category: DEVICE_FEATURE_CATEGORIES.LIGHT,
        type: DEVICE_FEATURE_TYPES.LIGHT.BINARY,
        read_only: false,
        keep_history: true,
        has_feedback: false,
        min: 0,
        max: 1,
      },
      {
        name: 'color',
        selector: `rflink:milight:86aa70:12:color`,
        external_id: `rflink:milight:86aa70:12:color`,
        rfcode: {
          value: 'RGBW',
          cmd: 'COLOR',
        },
        category: DEVICE_FEATURE_CATEGORIES.LIGHT,
        type: DEVICE_FEATURE_TYPES.LIGHT.COLOR,
        read_only: false,
        keep_history: true,
        has_feedback: false,
        min: 0,
        max: 255,
      },
      {
        name: 'brightness',
        selector: `rflink:milight:86aa70:12:brightness`,
        external_id: `rflink:milight:86aa70:12:brightness`,
        rfcode: {
          value: 'RGBW',
          cmd: 'BRIGHT',
        },
        category: DEVICE_FEATURE_CATEGORIES.LIGHT,
        type: DEVICE_FEATURE_TYPES.LIGHT.BRIGHTNESS,
        read_only: false,
        keep_history: true,
        has_feedback: false,
        min: 0,
        max: 100,
      },
      {
        name: 'milight-mode',
        selector: `rflink:milight:86aa70:12:milight-mode`,
        external_id: `rflink:milight:86aa70:12:milight-mode`,
        rfcode: 'CMD',
        category: DEVICE_FEATURE_CATEGORIES.LIGHT,
        type: DEVICE_FEATURE_TYPES.LIGHT.MODE,
        read_only: false,
        keep_history: true,
        has_feedback: false,
        min: 1,
        max: 8,
      },
    ],
  },
];

module.exports = DEVICES;
