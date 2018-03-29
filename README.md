![Moleculer logo](http://moleculer.services/images/banner.png)

[![Build Status](https://travis-ci.org/moleculerjs/moleculer-sidecar-hemera.svg?branch=master)](https://travis-ci.org/moleculerjs/moleculer-sidecar-hemera)
[![Coverage Status](https://coveralls.io/repos/github/moleculerjs/moleculer-sidecar-hemera/badge.svg?branch=master)](https://coveralls.io/github/moleculerjs/moleculer-sidecar-hemera?branch=master)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/<----hash----->)](https://www.codacy.com/app/<---username---->/moleculer-sidecar-hemera?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=moleculerjs/moleculer-sidecar-hemera&amp;utm_campaign=Badge_Grade)
[![Code Climate](https://codeclimate.com/github/moleculerjs/moleculer-sidecar-hemera/badges/gpa.svg)](https://codeclimate.com/github/moleculerjs/moleculer-sidecar-hemera)
[![David](https://img.shields.io/david/moleculerjs/moleculer-sidecar-hemera.svg)](https://david-dm.org/moleculerjs/moleculer-sidecar-hemera)
[![Known Vulnerabilities](https://snyk.io/test/github/moleculerjs/moleculer-sidecar-hemera/badge.svg)](https://snyk.io/test/github/moleculerjs/moleculer-sidecar-hemera)
[![Join the chat at https://gitter.im/moleculerjs/moleculer](https://badges.gitter.im/moleculerjs/moleculer.svg)](https://gitter.im/moleculerjs/moleculer?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

# moleculer-sidecar-hemera [![NPM version](https://img.shields.io/npm/v/moleculer-sidecar-hemera.svg)](https://www.npmjs.com/package/moleculer-sidecar-hemera)

Sidecar service to call Hemera services.

## Features

## Install
```
npm install moleculer-sidecar-hemera
```

## Usage

### Moleculer side

**Call a Hemera service**

```js
broker.call("hemera.act", { topic: "math", cmd: "add", a: 5, b: 3 })
	.then(res => broker.logger.info("Result: ", res))
	.catch(err => broker.logger.error(err));

```

### Hemera side

**Call a Moleculer service**

```js
hemera.act({
	topic: "moleculer",
	cmd: "call",
	action: "greeter.welcome",
	params: {
		name: "John"
	}
}).then(msg => hemera.log.info("Result: ", msg.data))
.catch(err => hemera.log.error(err));
```

**Emit a Moleculer event**

```js
hemera.act({
	topic: "moleculer",
	cmd: "emit",
	event: "user.created",
	payload: {
		id: 5,
		name: "John"
	}
	// groups: []
}).catch(err => hemera.log.error(err));
```

**Broadcast a Moleculer event**

```js
hemera.act({
	topic: "moleculer",
	cmd: "broadcast",
	event: "user.created",
	payload: {
		id: 5,
		name: "John"
	}
	// groups: []
}).catch(err => hemera.log.error(err));
```


# Test
```
$ npm test
```

In development with watching

```
$ npm run ci
```

# Contribution
Please send pull requests improving the usage and fixing bugs, improving documentation and providing better examples, or providing some testing, because these things are important.

# License
The project is available under the [MIT license](https://tldrlegal.com/license/mit-license).

# Contact
Copyright (c) 2018 MoleculerJS

[![@icebob](https://img.shields.io/badge/github-moleculerjs-green.svg)](https://github.com/moleculerjs) [![@icebob](https://img.shields.io/badge/twitter-Icebobcsi-blue.svg)](https://twitter.com/Icebobcsi)