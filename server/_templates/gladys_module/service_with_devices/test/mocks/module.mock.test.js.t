---
to: test/services/<%= module %>/mocks/<%= module %>.mock.test.js
---

const { fake } = require('sinon');

const <%= className %>HandlerMock = function <%= className %>HandlerMock(gladys, serviceId) {
  this.gladys = gladys;
  this.serviceId = serviceId;
};

<%= className %>HandlerMock.prototype.stop = fake.returns(null);
<%= className %>HandlerMock.prototype.start = fake.returns(null);
<%= className %>HandlerMock.prototype.getStatus = fake.resolves(true);
<%= className %>HandlerMock.prototype.saveConfiguration = fake.resolves(true);
<%= className %>HandlerMock.prototype.getConfiguration = fake.resolves({
  login: 'login',
  password: 'password',
});
<%= className %>HandlerMock.prototype.scan = fake.resolves([{external_id: 'external_id1'}]);
<%= className %>HandlerMock.prototype.poll = fake.resolves(true);
<%= className %>HandlerMock.prototype.setValue = fake.resolves(true);
<%= className %>HandlerMock.prototype.getDiscoveredDevices = fake.returns([{ external_id: "external_id1" }]);


module.exports = {
  <%= className %>HandlerMock,
};
