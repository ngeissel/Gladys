const sinon = require('sinon');

const { assert, fake } = sinon;
const { serviceId } = require('../../mocks/consts.test');
const NukiHandler = require('../../../../../services/nuki/lib');
const NukiMQTTHandler = require('../../../../../services/nuki/lib/mqtt');

const mqttService = {
  device: {
    subscribe: fake.returns(null),
  },
};

const gladys = {
  variable: {
    getValue: fake.resolves(null),
    setValue: fake.resolves(null),
  },
  device: {
    get: fake.resolves([]),
  },
  service: {
    getService: fake.returns(mqttService),
  },
};

describe('nuki.mqtt.connect command', () => {
  let nukiHandler;

  beforeEach(() => {
    const nuki = new NukiHandler(gladys, serviceId);
    nukiHandler = new NukiMQTTHandler(nuki);
    sinon.spy(nukiHandler, 'handleMessage');
  });

  afterEach(() => {
    sinon.reset();
  });

  it('should connect to mqtt topic', async () => {
    await nukiHandler.connect();
    assert.calledWith(gladys.service.getService, 'mqtt');
    assert.callCount(mqttService.device.subscribe, 1);
    mqttService.device.subscribe.firstCall.calledWith('stat/+/+', nukiHandler.handleMessage.bind(nukiHandler));
    
  });

});
