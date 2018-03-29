"use strict";

const Hemera = require("nats-hemera");
const nats = require("nats").connect();

const hemera = new Hemera(nats, {
	logLevel: "warn"
});

// Call Moleculer service
function callMoleculerService() {
	console.log("Call 'greeter.welcome' Moleculer service...");
	
	hemera.act({
		topic: "moleculer",
		cmd: "call",
		action: "greeter.welcome",
		params: {
			name: "John"
		}
	}).then(msg => {
		console.log("Result from Moleculer service: ", msg.data);
	}).catch(err => {
		console.log("Error", err);
	});
}

// Emit Moleculer event
function emitMoleculerEvent() {
	console.log("Send event to Moleculer service...");
	hemera.act({
		topic: "moleculer",
		cmd: "emit",
		event: "user.created",
		payload: {
			id: 5,
			name: "John"
		}
	}).catch(err => {
		console.log("Error", err);
	});
}

hemera.ready(() => {
	hemera.add(
		{
			topic: "math",
			cmd: "add"
		},
		req => Promise.resolve(req.a + req.b)
	);

	setInterval(() => {
		callMoleculerService();
		
		//emitMoleculerEvent();

	}, 2000);
});
