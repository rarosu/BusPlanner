describe('Home page', function () {
	beforeEach(function() {
		
	});
	
    it('should redirect index.html to index.html#/index', function () {
        browser.get('http://localhost:8080');
		browser.getLocationAbsUrl().then(function(url) {
			expect(url).toEqual('/index');
		});
    });
});