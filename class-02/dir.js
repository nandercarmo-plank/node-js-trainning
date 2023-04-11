const { dir } = require('console');
const fs = require('fs');
const path = require('path');

const dirName = path.join(__dirname, 'new-folder');

if(!fs.existsSync(dirName)) {
	fs.mkdir(dirName, (err) => {
		if(err) throw err;
		console.log('Directory created');
	});
}

if(fs.existsSync(dirName)) {
	fs.rmdir(dirName, (err) => {
		if(err) throw err;
		console.log('Directory removed');
	});
}