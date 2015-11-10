exports.config = {
	seleniumAddress: 'http://localhost:4444/wd/hub',
    specs: [
        'tests/e2etests/*.js'
    ],
    capabilities: {
        'browserName': 'firefox'
    },
    baseUrl: 'http://localhost:8000/',
    framework: 'jasmine'
};