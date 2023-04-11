const fs = require('fs');
const path = require('path');

const readStream = fs.createReadStream(path.join(__dirname, 'files', 'lorem.txt'), { encoding: 'utf-8' });
const writableStream = fs.createWriteStream(path.join(__dirname, 'files', 'new-lorem.txt'));

/* readStream.on('data', (dataChunk) => {
	writableStream.write(dataChunk);
}) */

readStream.pipe(writableStream);