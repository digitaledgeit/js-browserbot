var assert = require('assert');
var server = require('./server');
var browser = require('../lib/browser');

describe('browser-dom', function() {

	describe('.title()', function() {

		it('should return the page title', function(done) {

			var srv = server(function (req, res) {
				res.write('<html><head><title>A PhantomJS Browser Test</title></head><body><h1>Test</h1></body>');
				res.end();
			});

			browser.create(function (browser) {

				browser.once('LoadFinished', function () {
					browser.title(function (err, title) {
						browser.destroy();

						assert.equal(typeof(err), typeof(undefined));
						assert.equal(title, 'A PhantomJS Browser Test');

						done();
					});
				});

				browser.go(srv.url);

			});

		});

	});

});