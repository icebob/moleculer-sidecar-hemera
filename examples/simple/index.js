"use strict";

let { ServiceBroker } 	= require("moleculer");
let HemeraSC 			= require("../../index");

// Create broker
let broker = new ServiceBroker({
	logger: console
});

broker.createService({
	name: "greeter",

	actions: {
		welcome(ctx) {
			this.logger.info("greeter.welcome action is called.");
			return `Hello ${ctx.params.name}!`;
		}
	},

	events: {
		"user.created"(payload) {
			this.logger.info("User created event received from Hemera!", payload);
		}
	}
});

// Load Hemera sidecar
broker.createService(HemeraSC);

// Start server
broker.start().then(() => {

	broker.repl();

	// Call action
	broker.call("hemera.act", { topic: "math", cmd: "add", a: 5, b: 3 })
		.then(res => broker.logger.info("Result from Hemera service: ", res))
		.catch(broker.logger.error);

});
