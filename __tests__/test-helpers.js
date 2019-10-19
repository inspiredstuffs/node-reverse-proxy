const http = require('http')
const httpProxy = require('http-proxy');
const app = require('../setup.js');

const proxyServer = httpProxy.createProxyServer({
  target: 'http://127.0.0.1:9999'
})
const targetServer = http.createServer(function (req, res) {
  res.writeHead(200, {
    'Content-Type': 'text/plain'
  });
  res.write('request successfully proxied!' + '\n' + JSON.stringify(req.headers, true, 2));
  res.end();
})

exports.setup = new Object({
  proxyServer: proxyServer,
  targetServer: targetServer,
  start_servers: function () {
    targetServer.listen(9999, () => {
      console.log("Waiting for requests on Target server...", "Listening on PORT: 9999");
    })
    proxyServer.listen(7777, () => {
      console.log("Waiting for requests on proxy Tunnel...", "Listening on PORT: 7777");
    })
    app.server.listen(8888, () => {
      console.log("Waiting for requests on reverse proxy server...", "Listening on PORT: 8888");
    })
  },
  stop_servers: function () {
    targetServer.close();
    proxyServer.close();
    app.server.close();
  }
})