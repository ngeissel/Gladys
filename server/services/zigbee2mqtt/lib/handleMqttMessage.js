const logger = require('../../../utils/logger');
const { EVENTS, WEBSOCKET_MESSAGE_TYPES } = require('../../../utils/constants');
const { convertDevice } = require('../utils/convertDevice');
const { convertValue } = require('../utils/convertValue');
const { convertFeature } = require('../utils/convertFeature');

const TYPE_COORDINATOR = 'Coordinator';

/**
 * @description Handle a new message receive in MQTT.
 * @param {string} topic - MQTT topic.
 * @param {Object} message - The message sent.
 * @returns {Object} Device.
 * @example
 * handleMqttMessage('stat/zigbee2mqtt/POWER', 'ON');
 */
function handleMqttMessage(topic, message) {
  this.zigbee2mqttConnected = true;
  this.gladys.event.emit(EVENTS.WEBSOCKET.SEND_ALL, {
    type: WEBSOCKET_MESSAGE_TYPES.ZIGBEE2MQTT.STATUS_CHANGE,
  });

  switch (topic) {
    case 'zigbee2mqtt/bridge/config/devices': {
      logger.log('Getting config devices from Zigbee2mqtt');
      const devices = JSON.parse(message);
      const convertedDevices = devices
        // Remove Coordinator
        .filter((d) => d.type !== TYPE_COORDINATOR)
        // Remove Empty models
        .filter((d) => d.model && d.model !== '')
        // Remove existing devices
        .filter((d) => {
          const existingDevice = this.gladys.stateManager.get('deviceByExternalId', `zigbee2mqtt:${d.friendly_name}`);
          if (existingDevice) {
            return false;
          }
          return true;
        })
        // Add features
        .map((d) => convertDevice(d, this.serviceId));

      this.gladys.event.emit(EVENTS.WEBSOCKET.SEND_ALL, {
        type: WEBSOCKET_MESSAGE_TYPES.ZIGBEE2MQTT.DISCOVER,
        payload: convertedDevices,
      });
      break;
    }
    case 'zigbee2mqtt/bridge/config': {
      // Keep only "permit_join" value
      const config = JSON.parse(message);
      this.z2mPermitJoin = config.permit_join;

      logger.log('Getting config from Zigbee2mqtt : permit_joint =', this.z2mPermitJoin);

      this.gladys.event.emit(EVENTS.WEBSOCKET.SEND_ALL, {
        type: WEBSOCKET_MESSAGE_TYPES.ZIGBEE2MQTT.PERMIT_JOIN,
        payload: this.z2mPermitJoin,
      });
      break;
    }
    case 'zigbee2mqtt/bridge/response/permit_join': {
      const config = JSON.parse(message);
      this.z2mPermitJoin = config.data.value;

      logger.log('Getting permit_joint :', this.z2mPermitJoin);

      this.gladys.event.emit(EVENTS.WEBSOCKET.SEND_ALL, {
        type: WEBSOCKET_MESSAGE_TYPES.ZIGBEE2MQTT.PERMIT_JOIN,
        payload: this.z2mPermitJoin,
      });
      break;
    }
    case 'zigbee2mqtt/bridge/config/permit_join': {
      const config = JSON.parse(message);
      this.z2mPermitJoin = config;

      logger.log('Getting permit_joint :', this.z2mPermitJoin);

      this.gladys.event.emit(EVENTS.WEBSOCKET.SEND_ALL, {
        type: WEBSOCKET_MESSAGE_TYPES.ZIGBEE2MQTT.PERMIT_JOIN,
        payload: this.z2mPermitJoin,
      });
      break;
    }
    default: {
      const splittedTopic = topic.split('/');
      if (!message) {
        logger.warn(`Zigbee2mqtt topic ${topic} empty message.`);
      } else if (splittedTopic.length === 2) {
        const deviceName = splittedTopic[1];
        const incomingFeatures = JSON.parse(message);
        // Fetch device from name
        const device = this.gladys.stateManager.get('deviceByExternalId', `zigbee2mqtt:${deviceName}`);
        if (device) {
          Object.keys(incomingFeatures).forEach((zigbeeFeatureField) => {
            // Find the feature regarding the field name
            const feature = convertFeature(device.features, zigbeeFeatureField);
            if (feature) {
              const newState = {
                device_feature_external_id: `${feature.external_id}`,
                state: convertValue(feature.type, incomingFeatures[zigbeeFeatureField]),
              };
              this.gladys.event.emit(EVENTS.DEVICE.NEW_STATE, newState);
            } else {
              logger.warn(`Zigbee2mqtt device ${deviceName}, feature ${zigbeeFeatureField} not configured in Gladys.`);
            }
          });
        } else {
          logger.warn(`Zigbee2mqtt device ${deviceName} not configured in Gladys.`);
        }
      } else {
        logger.log(`Zigbee2mqtt topic ${topic} not handled.`);
      }
    }
  }
}

module.exports = {
  handleMqttMessage,
};
