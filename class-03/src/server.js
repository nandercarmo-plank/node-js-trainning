const http = require('http');
const path = require('path');
const fs = require('fs');
const fsPromises = require('fs').promises;

const { Emitter } = require('./js/my-emitter');
const { 
	getExtension, 
	getContentType, 
	getFilePath, 
	handleFileNotFound,
	serveFile
} = require('./js/util');

const PORT = process.env.PORT || 3500;
const emitter = new Emitter();

const server = http.createServer((req, res) => {	
	
	const extension = getExtension(req);
	const contentType = getContentType(req);
	const filePath = getFilePath(req, contentType, extension);
	const fileExists = fs.existsSync(filePath);

	/* console.log(`\nreq.url: ${req.url}`);
	console.log(`req.method: ${req.method}`);
	console.log(`contentType: ${contentType}`);
	console.log(`filePath: ${filePath}`); */

	emitter.emit('log', `${req.method} request on ${req.url}`);
	
	if(!fileExists) handleFileNotFound(res, filePath);
	else serveFile(res, filePath, contentType, 200);
});



server.listen(PORT, () => console.log(`Server running on port ${PORT}...`))

/* setTimeout(() => myEmitter.emit('log', 'Hello, World!'), 2000); */