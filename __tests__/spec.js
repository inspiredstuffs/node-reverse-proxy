const dotenv = require('dotenv');
dotenv.config({
  path: '.env.test'
});

const request = require('request')
const test = require('./test-helpers.js').setup;
const app = require('../setup.js');
const expect = require('expect.js')

describe('Reverse Proxy e2e testing', function () {
  before(() => {
    test.start_servers()
  });

  after(() => {
    test.stop_servers()
  });

  describe('Forwarding requests sent to this server to an upstream server via a proxy server', function () {
    it('forward requests to the target server', function () {
      request('http://127.0.0.1:8888/tests', function (error, response, body) {
        expect(body).to.contain("request successfully proxied!")
        expect(response.statusCode).to.eql(200)
      }).end();
    });
  });
});