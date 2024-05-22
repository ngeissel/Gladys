---
to: test/services/<%= module %>/lib/commands/<%= module %>.start.test.js
---
const sinon = require('sinon');

const { assert, fake } = sinon;

const <%= className %>Handler = require('../../../../../services/<%= module %>/lib');

const gladys = {
  variable: {
    getValue: fake.resolves(null),
    setValue: fake.resolves(null),
  },
  device: {
    get: fake.resolves([]),
  },
};
const serviceId = 'de051f90-f34a-4fd5-be2e-e502339ec9bc';

describe('<%= module %>.start command', () => {
  let <%= attributeName %>Handler;

  beforeEach(() => {
    <%= attributeName %>Handler = new <%= className %>Handler(gladys, serviceId);
  });

  afterEach(() => {
    sinon.reset();
  });

  it('Init default values at start', async () => {
    await <%= attributeName %>Handler.start();
    // TODO : complete
    assert.notCalled(gladys.variable.setValue);
  });

});