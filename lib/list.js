var inquirer = require('inquirer');
const request =  require('request');
var FeedParser = require('feedparser');

const HEADLINES_URL = "https://newsapi.org/v2/top-headlines?sources=techcrunch"

const SEARCH_URL = "https://newsapi.org/v2/everything"

const FEED_URL = "https://techcrunch.com/feed/"

var feedparser = new FeedParser();
var req = request(FEED_URL)


function listArticles() {

    req.on('response', function (res) {
        var stream = this; // `this` is `req`, which is a stream

        if (res.statusCode !== 200) {
            this.emit('error', new Error('Bad status code'));
        }
        else {
            stream.pipe(feedparser);
        }
    });

    feedparser.on('error', function (error) {
        // always handle errors
    });

    feedparser.on('readable', function () {
        // This is where the action is!
        var stream = this; // `this` is `feedparser`, which is a stream
        var meta = this.meta; // **NOTE** the "meta" is always available in the context of the feedparser instance
        var item;

        while (item = stream.read()) {
            console.log(item);
        }
    });

console.log('Hello')
}


listArticles()