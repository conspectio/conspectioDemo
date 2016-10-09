'use strict';

const conspectio = {};

conspectio.hello = () => {
  console.log('conspectio says hello');
};

conspectio.testRequire = require('./testRequire.js');

window.conspectio = conspectio;