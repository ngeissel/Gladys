const sinon = require('sinon');
const proxyquire = require('proxyquire').noCallThru();
const { serviceId } = require('../../mocks/consts.test');

const { assert } = sinon;
const NukiProtocolHandlerMock = require('../../mocks/nuki.protocol.mock.test');

const mockInstance = new NukiProtocolHandlerMock();

const NukiHandler = proxyquire('../../../../../services/nuki/lib', {
  './mqtt': NukiProtocolHandlerMock,
});

const { DEVICE_PARAM_NAME, DEVICE_PARAM_VALUE } = require('../../../../../services/nuki/lib/utils/nuki.constants');

const gladys = {};

describe('Nuki - stop', () => {
  let nukiHandler;

  beforeEach(() => {
    nukiHandler = new NukiHandler(gladys, serviceId);
  });

  afterEach(() => {
    sinon.reset();
  });

  it('disconnect all protocols', () => {
    nukiHandler.stop();

    assert.callCount(mockInstance.disconnect, Object.keys(DEVICE_PARAM_VALUE[DEVICE_PARAM_NAME.PROTOCOL]).length);
  });
});