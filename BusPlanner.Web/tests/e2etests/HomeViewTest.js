describe('Home page', function () {
    it('should redirect index.html to index.html#/index', function () {
        browser.get('index.html');
        browser.getLocationAbsUrl().then(function (url) {
            expect(url).toEqual('/index');
        });
    });
});