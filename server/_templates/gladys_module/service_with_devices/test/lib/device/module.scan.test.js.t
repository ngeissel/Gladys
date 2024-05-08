---
to: test/services/<%= module %>/lib/device/<%= module %>.scan.test.js
---
const sinon = require('sinon');
const { serviceId } = require('../../mocks/consts.test');
const <%= className %>Handler = require('../../../../../services/nuki/lib');

const { assert } = sinon;
const gladys = {};

describe('<%= className %> scan for new devices', () => {
  let <%= attributeName %>Handler;

  beforeEach(() => {
    <%= attributeName %>Handler = new <%= className %>Handler(gladys, serviceId);
  });

  afterEach(() => {
    sinon.reset();
  });

  it('should scan for new devices', () => {
    <%= attributeName %>Handler.scan();
    // TODO : write the test !
  });
});