// An example configuration file.
exports.config = {
	directConnect: true,

	// Capabilities to be passed to the webdriver instance.
	capabilities: {
		'browserName': 'chrome'
	},

	// Framework to use. Jasmine 2 is recommended.
	framework: 'jasmine2',

	// Spec patterns are relative to the current working directly when
	// protractor is called.
	specs: ['tests/e2etests/**/*.js'],
	
	// Chrome only standalone
	chromeDriver: './node_modules/protractor/selenium/chromedriver',
	chromeOnly: true,

	// Options to be passed to Jasmine.
	jasmineNodeOpts: {
		defaultTimeoutInterval: 30000
	}
};
