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
        var stream = this;
        if (res.statusCode !== 200) {
            this.emit('error', new Error('Bad status code'));
        }
        else {
            stream.pipe(feedparser);
        }
    });


    feedparser.on('readable', function () {

        var stream = this;
        var meta = this.meta;
        var item;

        while (item = stream.read()) {
            console.log(item);
        }
    });

console.log('Hello')
}


listArticles()