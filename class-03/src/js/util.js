const path = require('path');
const fsPromises = require('fs').promises;

const { Emitter } = require('./my-emitter');

const emitter = new Emitter();

const getExtension = (req) => path.extname(req.url);

const getContentType = (req) => {

	let contentType;

	switch (getExtension(req)) {
		case '.css': contentType = 'text/css'; break;
		case '.js': contentType = 'text/javascript'; break;
		case '.json': contentType = 'application/json'; break;
		case '.jpg': contentType = 'image/jpeg'; break;
		case '.png': contentType = 'image/png'; break;
		case '.txt': contentType = 'text/plain'; break;
		default: contentType = 'text/html'; break;
	}

	return contentType;
};

const getFilePath = (req, contentType, extension) => {
	
	let filePath = contentType === 'text/html' && req.url === '/'
		? path.join(__dirname, '..', 'views', 'index.html')
		: contentType === 'text/html' && req.url.slice (-1) === '/'
			? path.join(__dirname, '..', 'views', req.url, 'index.html')
			: contentType === 'text/html' 
				? path.join(__dirname, '..', 'views', req.url)
				: path.join(__dirname, '..', req.url);

	if(!extension && req.url.slice(-1) !== '/') filePath += '.html';

	return filePath;
};

const handleFileNotFound = (res, filePath) => {
	
	switch (path.parse(filePath).base) {
		case 'old-page.html': 
			res.writeHead(301, { 'Location':  '/new-page.html'});
			res.end();
			break;
		case 'www-page.html':  
			res.writeHead(301, { 'Location':  '/'});
			res.end();
			break;
		default: serveFile(res, path.join(__dirname, '..', 'views', '404.html'), 'text/html', 404); break;
	}
}

const serveFile = async (res, filePath, contentType, code) => {

	try {

		const format = !contentType.includes('image') ? 'utf-8' : '';
		const data = await fsPromises.readFile(filePath, format);

		res.writeHead(code, { 'Content-Type': contentType });
		res.end(data);
		
	} catch (err) {
		emitter.emit('log', err.stack);
		res.statusCode = 500;
		res.end();
	}
}

module.exports = {
	getExtension,
	getContentType,
	getFilePath,
	handleFileNotFound,
	serveFile
}