// see types of prompts:
// https://github.com/enquirer/enquirer/tree/master/examples
// see advanced :
// https://github.com/jondot/hygen/issues/35
const promptArgs = require('../../promptArgsUtil');

const questions = [
  {
    type: 'input',
    name: 'module',
    message: "What's your module name (ie:androidtv)? It will create the service folder (ie: services/androidtv)",
  },
  {
    type: 'input',
    name: 'className',
    message: 'Used in Service, Handler and Controller name as prefix (ie: AndroidTv => AndroidTvService):',
  },
  {
    type: 'input',
    name: 'constName',
    message: 'Used as prefix for constants (ie: androidtv => ANDROIDTV):',
  },
];

module.exports = {
  prompt: promptArgs(questions)
};
