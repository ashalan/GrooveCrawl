var casper = require('casper').create();
var links = [];
var titles = [];
var username = '';

function getLinks() {
    var links = document.querySelectorAll('div a');
    return Array.prototype.map.call(links, function(e) {
        return e.getAttribute('href');
    });
}
function getTitles() {
    var titles = document.querySelectorAll('div a');
    return Array.prototype.map.call(titles, function(e) {
        return e.innerHTML;
    });
}

casper.start('http://groovebackup.com/', function() {
    this.echo(this.getTitle());
    this.fill('form[action="/loginWithName.php"]', { usernameOrEmail: username }, true);
});

casper.then(function() {
    links = this.evaluate(getLinks);
    titles = this.evaluate(getTitles);

});

casper.run(function() {
    // echo results in some pretty fashion
    this.echo(links.length + ' links found:');
    this.echo(titles.length + ' titles found:');
    for (var i = 0; i < links.length; i++) {
        this.download(links[i], titles[i]);        
    }
});
