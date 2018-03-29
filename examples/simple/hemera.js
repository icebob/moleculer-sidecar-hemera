"use strict";

const Hemera = require("nats-hemera");
const nats = require("nats").connect();

const hemera = new Hemera(nats, {
	logLevel: "info"
});

// Call Moleculer service
function callMoleculerService() {
	hemera.log.info("Call 'greeter.welcome' Moleculer service...");
	
	hemera.act({
		topic: "moleculer",
		cmd: "call",
		action: "greeter.welcome",
		params: {
			name: "John"
		}
	}).then(msg => {
		hemera.log.info("Result from Moleculer service: ", msg.data);
	}).catch(err => {
		hemera.log.error("Error", err);
	});
}

// Emit Moleculer event
function emitMoleculerEvent() {
	hemera.log.info("Send event to Moleculer service...");
	hemera.act({
		topic: "moleculer",
		cmd: "emit",
		event: "user.created",
		payload: {
			id: 5,
			name: "John"
		}
	}).catch(err => {
		hemera.log.error("Error", err);
	});
}

hemera.ready(() => {
	hemera.add(
		{
			topic: "math",
			cmd: "add"
		},
		function(req, cb) {
			cb(null, req.a + req.b);
		}
	);

	setInterval(() => {
		callMoleculerService();
		
		emitMoleculerEvent();

	}, 2000);
});
