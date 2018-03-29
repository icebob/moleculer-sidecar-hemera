/*
 * moleculer-sidecar-hemera
 * Copyright (c) 2018 MoleculerJS (https://github.com/moleculerjs/moleculer-sidecar-hemera)
 * MIT Licensed
 */

"use strict";

const Hemera = require("nats-hemera");

module.exports = {

	name: "hemera",

	/**
	 * Default settings
	 */
	settings: {
		natsOptions: undefined,

		hemeraOptions: {
			logLevel: "warn"
		}
	},

	/**
	 * Actions
	 */
	actions: {

		/**
		 * Call a Hemera service
		 */
		act: {
			handler(ctx) {
				return this.hemera.act(ctx.params);
			}
		}
	},


	methods: {

		/**
		 * Create Hemera service
		 */
		createHemera() {
			const nats = require("nats").connect(this.settings.natsOptions);
			this.hemera = new Hemera(nats, this.settings.hemeraOptions);
			this.hemera.logger = this.logger;

			this.hemera.ready()
				.then(() => this.registerHemeraService())
				.catch(err => this.broker.fatal("Hemera initialization error!", err));

		},

		/**
		 * Register sidecar actions to Hemera framework
		 */
		registerHemeraService() {

			// Hemera action to call Moleculer service
			this.hemera.add({
				topic: "moleculer",
				cmd: "call"
			}, req => this.broker.call(req.action, req.params, req.options));

			// Hemera action to emit Moleculer event
			this.hemera.add({
				topic: "moleculer",
				cmd: "emit"
			}, req => {
				this.broker.emit(req.event, req.payload, req.groups);
				return this.Promise.resolve();
			});

			// Hemera action to broadcast Moleculer event
			this.hemera.add({
				topic: "moleculer",
				cmd: "broadcast"
			}, req => {
				this.broker.broadcast(req.event, req.payload, req.groups);
				return this.Promise.resolve();
			});
		}
	},

	/**
	 * Service created lifecycle event handler
	 */
	created() {
		this.createHemera();
	},

	/**
	 * Service started lifecycle event handler
	 */
	started() {

	},

	/**
	 * Service stopped lifecycle event handler
	 */
	stopped() {

	}
};