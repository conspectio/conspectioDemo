// require in jquery
const $ = require("jquery");
const setupViewerDom = require('./setupViewerDom.js');
// const viewerRTCEndpoint  = require('./viewerRTCEndpoint.js');

const viewerSetup = () => {
  // set the conspectio.initiator to false to indicate viewer role
  conspectio.initiator = false;

  // reset conspectio.connections
  conspectio.connections = {};

  // invoke setupDom - setup DOM elements on webpage with appropriate click handlers
  setupViewerDom();

  // invoke viewerRTCEndpoint - setup appropriate socket events relating to webRTC connection
  // viewerRTCEndpoint();
};

module.exports = viewerSetup;