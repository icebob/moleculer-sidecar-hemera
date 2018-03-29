# moleculer-sidecar-hemera [![NPM version](https://img.shields.io/npm/v/moleculer-sidecar-hemera.svg)](https://www.npmjs.com/package/moleculer-sidecar-hemera)

Sidecar service to call Hemera services.

## Features
- call Hemera service from Moleculer service
- call Moleculer service from Hemera service
- emit Moleculer event from Hemera service
- broadcast Moleculer event from Hemera service

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

## Settings

| Property | Type | Default | Description |
| -------- | ---- | ------- | ----------- |
| `natsOptions` | `Object` | `undefined` | NATS `connect` options for Hemera. |
| `hemeraOptions` | `Object` | `{}` | Hemera constructor options. |


## Test
```
$ npm test
```

In development with watching

```
$ npm run ci
```

## Contribution
Please send pull requests improving the usage and fixing bugs, improving documentation and providing better examples, or providing some testing, because these things are important.

## License
The project is available under the [MIT license](https://tldrlegal.com/license/mit-license).

## Contact
Copyright (c) 2018 MoleculerJS

[![@icebob](https://img.shields.io/badge/github-moleculerjs-green.svg)](https://github.com/moleculerjs) [![@icebob](https://img.shields.io/badge/twitter-Icebobcsi-blue.svg)](https://twitter.com/Icebobcsi)