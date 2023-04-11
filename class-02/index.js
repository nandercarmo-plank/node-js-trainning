const fsPromisses = require('fs').promises;
const path = require('path');

const fileOps = async () => {

	try {

		const data = await fsPromisses.readFile(path.join(__dirname, 'files', 'starter.txt'), 'utf-8');
		console.log('Reading...')
		console.log(data);

		await fsPromisses.unlink(path.join(__dirname, 'files', 'starter.txt'));
		await fsPromisses.writeFile(path.join(__dirname, 'files', 'reply.txt'), data);
		await fsPromisses.appendFile(path.join(__dirname, 'files', 'reply.txt'), 'Nice to meet you!\n');
		await fsPromisses.rename(path.join(__dirname, 'files', 'reply.txt'), path.join(__dirname, 'files', 'newReply.txt'));

		const newData = await fsPromisses.readFile(path.join(__dirname, 'files', 'newReply.txt'), 'utf-8');
		console.log('Reading new file...');
		console.log(newData);

	} catch(err) {
		console.error(err);
	}
}

fileOps();

/* fs.readFile(path.join(__dirname, 'files', 'starter.txt'), 'utf-8', (err, data) => {
	if(err) throw err;
	console.log('Reading... ', data);

	fs.writeFile(path.join(__dirname, 'files', 'reply.txt'), 'Nice to meet you!\n', (err) => {
		if(err) throw err;
		console.log('Write complete');

		fs.appendFile(path.join(__dirname, 'files', 'reply.txt'), 'Yes, it is!.\n', (err) => {
			if(err) throw err;
			console.log('Append complete');

			fs.rename(path.join(__dirname, 'files', 'reply.txt'), path.join(__dirname, 'files', 'newReply.txt'), (err) => {
				if(err) throw err;
				console.log('Rename complete');
	
				
			});
		});
	});
}); */

process.on('uncaughtException', err => {
	console.error(`There was an uncaught error: ${err}`);
	process.exit(1);
});