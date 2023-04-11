const fs = require('fs');
const fsPromises = require('fs').promises;
const path = require('path');

const { format } = require('date-fns');
const { v4: uuid } = require('uuid');

const logEvents = async (message) => {

	const log = `[${format(new Date(), 'dd/MM/yyyy HH:mm:ss')}] ${uuid()}: ${message}`;

	console.log(log);

	try {
		
		if(!fs.existsSync(path.join(__dirname, '..', 'logs'))) {
			fs.mkdirSync(path.join(__dirname, '..', 'logs'));
		}

		await fsPromises.appendFile(path.join(__dirname, '..', 'logs', 'log.txt'), `${log}\n`);

	} catch (err) {
		console.error(err);
	}
}

module.exports = {
	logEvents
};