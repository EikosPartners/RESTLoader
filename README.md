Usage
---

```sh

$ npm install --save EikosPartners/RESTLoader

```

```js
var app = express(),
    routes = [];
var loader = require("RESTLoader")
routes.push(require('./Module'));
loader.load(app,routes);

--------------------------------------------------
module a sample module
--------------------------------------------------
API: {

        '/sampleEndPoint/:id': {
            type: 'get',
            desc: 'sample get endpoint',
            responder: function (req, res, next) {
                source.get(loader.respond(req, res));
            }
        },
        '/sampleEndPoint/:id': {
            type: 'post',
            desc: 'sends a post to an endpoint',
            responder: function (req, res, next) {
                source.saveMany(req, next);
            }
        }
};

```


```

Linting
---

Linted with jshint

```sh
$ npm run lint
```

Testing
---

Tested with mocha

```sh
$ npm test
```

Documentation
---

Documented with jsdoc

```sh
$ npm run docs
```

