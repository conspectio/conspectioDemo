'use strict';

const conspectio = {};

// conspectio.hello = () => {
//   console.log('conspectio says hello');
// };

// conspectio.testRequire = require('./testRequire.js');

// require in webrtc-adapter for shimming
require('webrtc-adapter');

// require in socket.io-client
const io = require('socket.io-client');

// instantiate shared socket
conspectio.socket = io();

conspectio.broadcasterStream = null;
conspectio.broadcasterEventTag = null;
conspectio.initiator = null;
conspectio.connections = {};
// conspectio.webRTCConfig = {};

// import module that handles broadcasterSetup
conspectio.broadcasterSetup = require('./broadcasterSetup');

window.conspectio = conspectio;