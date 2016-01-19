var _ = require('lodash'),
    formatted = '' +
    '<script src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js' +
    '/8.6/highlight.min.js"></script>' +
    '<script>hljs.initHighlightingOnLoad();</script>' +
    '<style>' +
    'body{background-color:#1C2A39}' +
    '.hljs{color:#6C7A89;font-size:1.2em}' +
    '.hljs-attribute{color:#2ECC71}' +
    '.hljs-string{color:#F39C12}' +
    '.hljs-number{color:#3498DB}' +
    '.hljs-literal{color:#9B59B6}' +
    '</style>';

module.exports = {
    respond: function ( req, res, format ) {
        return _.once(function ( error, data ) {
            //disable browser caching
            res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate"); // HTTP 1.1.
            res.setHeader("Pragma", "no-cache"); // HTTP 1.0.
            res.setHeader("Expires", "0"); // Proxies.
            if (req.query.formatted !== void 0 || format) {
                res.send(formatted +
                    '<pre><code class="json">' +
                    JSON.stringify(data, null, 4) +
                    '</code></pre>');
            } else
            if (error) {
                //data = {error: error}; currently not used
                res.status(404).send(error.error);
            } else {
                res.json(data);
            }
        });
    },
    load: function(app, routes){
        var key;
        routes.forEach(function ( route ) {
            var API = route.API;
            for (key in API) {
                console.log('registering ' + key + ' as ' + API[key].type);
                app[API[key].type](key, API[key].responder);
                if (API[key].type !== 'get' && API[key].type !== 'use') {
                    console.log('registering ' + key + ' as get');
                    app.get(key, API[key].responder);
                }
            }
        });
    }
};

