const { getMap } = require('./vacbot.getMap');

function vacbotWrapper(vacbot) {
    vacbot.name = vacbot.getName();
    vacbot.model = vacbot.deviceModel;
    vacbot.imageUrl = vacbot.deviceImageURL;
    vacbot.getMap = getMap;
    return vacbot;
} 

module.exports = {
    vacbotWrapper,
  };
