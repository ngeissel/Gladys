import { DEVICE_FEATURE_TYPES } from '../../../../../server/utils/constants';

const SUPPORTED_FEATURE_TYPES = [
  DEVICE_FEATURE_TYPES.LIGHT.BINARY,
  DEVICE_FEATURE_TYPES.LIGHT.COLOR,
  DEVICE_FEATURE_TYPES.LIGHT.BRIGHTNESS,
  DEVICE_FEATURE_TYPES.LIGHT.TEMPERATURE,
  DEVICE_FEATURE_TYPES.SWITCH.DIMMER,
  DEVICE_FEATURE_TYPES.TELEVISION.CHANNEL,
  DEVICE_FEATURE_TYPES.TELEVISION.VOLUME,
  DEVICE_FEATURE_TYPES.SHUTTER.POSITION,
  DEVICE_FEATURE_TYPES.SHUTTER.STATE,
  DEVICE_FEATURE_TYPES.THERMOSTAT.TARGET_TEMPERATURE,
  DEVICE_FEATURE_TYPES.AIR_CONDITIONING.MODE,
  DEVICE_FEATURE_TYPES.AIR_CONDITIONING.TARGET_TEMPERATURE,
  DEVICE_FEATURE_TYPES.SIREN.LMH_VOLUME,
  DEVICE_FEATURE_TYPES.SIREN.MELODY,
  DEVICE_FEATURE_TYPES.DURATION.DECIMAL
];

export default SUPPORTED_FEATURE_TYPES;
