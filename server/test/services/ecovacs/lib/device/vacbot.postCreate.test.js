const proxyquire = require('proxyquire').noCallThru();
const sinon = require('sinon');
const { serviceId } = require('../../consts.test');

const { assert, fake } = sinon;
const ecovacsLoadVacbotsMock = fake.resolves(true);
const EcovacsHandler = proxyquire('../../../../../services/ecovacs/lib', {
  './commands/ecovacs.loadVacbots.js': { loadVacbots: ecovacsLoadVacbotsMock },
});

describe('Ecovacs - postCreate', () => {
  const ecovacsHandler = new EcovacsHandler({}, serviceId);

  afterEach(() => {
    sinon.reset();
  });

  it('should loads all vacbots', () => {
    ecovacsHandler.postCreate({});
    assert.calledOnce(ecovacsHandler.loadVacbots);
  });
});
