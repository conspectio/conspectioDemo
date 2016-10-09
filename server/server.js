const express = require('express');
const app = express();
const http = require ('http').Server(app);
const path = require('path');
const conspectioServer = require('./../lib/server/conspectioServer');
conspectioServer(http);

app.use(express.static(path.join(`${__dirname}/../dist`)));
app.use(express.static(path.join(`${__dirname}/../client`)));

app.get('/', (req,res) => {
	res.sendFile(path.resolve('client/index.html'));
});

http.listen(3000, function(){
	console.log('listening on 3000');
});

module.export = http;