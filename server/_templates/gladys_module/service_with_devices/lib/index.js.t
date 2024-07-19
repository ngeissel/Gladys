---
to: ./services/<%= module %>/lib/index.js
---
const <%= attributeName %>Handler = function <%= className %>Handler(gladys, serviceId) {
  this.gladys = gladys;
  this.serviceId = serviceId;
  this.discoveredDevices = [];
};

const { start } = require('./commands/<%= module %>.start');
const { stop } = require('./commands/<%= module %>.stop');
const { getStatus } = require('./commands/<%= module %>.getStatus');
const { getConfiguration } = require('./config/<%= module %>.getConfiguration');
const { saveConfiguration } = require('./config/<%= module %>.saveConfiguration');

const { scan } = require('./device/<%= module %>.scan');
const { getDiscoveredDevices } = require('./device/<%= module %>.getDiscoveredDevices');
const { notifyNewDevice } = require('./device/<%= module %>.notifyNewDevice');
const { setValue } = require('./device/<%= module %>.setValue');
const { poll } = require('./device/<%= module %>.poll');
const { postCreate } = require('./device/<%= module %>.postCreate');
const { postDelete } = require('./device/<%= module %>.postDelete');

// COMMANDS
<%= attributeName %>Handler.prototype.start = start;
<%= attributeName %>Handler.prototype.stop = stop;
<%= attributeName %>Handler.prototype.getStatus = getStatus;

// CONFIG
<%= attributeName %>Handler.prototype.getConfiguration = getConfiguration;
<%= attributeName %>Handler.prototype.saveConfiguration = saveConfiguration;

// DEVICE
<%= attributeName %>Handler.prototype.scan = scan;
<%= attributeName %>Handler.prototype.getDiscoveredDevices = getDiscoveredDevices;
<%= attributeName %>Handler.prototype.setValue = setValue;
<%= attributeName %>Handler.prototype.poll = poll;
<%= attributeName %>Handler.prototype.postCreate = postCreate;
<%= attributeName %>Handler.prototype.postDelete = postDelete;

module.exports =  <%= attributeName %>Handler;
