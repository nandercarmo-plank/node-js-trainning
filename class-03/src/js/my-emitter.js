const EventEmitter = require('events');

const { logEvents } = require('./log-events');

class Emitter extends EventEmitter {

	constructor() {
		super();
		this.on('log', (msg) => logEvents(msg));
	}
};

module.exports = {
	Emitter
};