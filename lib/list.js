var inquirer = require('inquirer');
const request =  require('request');
var FeedParser = require('feedparser');
var htmlToText = require('html-to-text');

const HEADLINES_URL = "https://newsapi.org/v2/top-headlines?sources=techcrunch"

const SEARCH_URL = "https://newsapi.org/v2/everything"

const FEED_URL = "https://techcrunch.com/feed/"

function getTextFromHtml(html) {
    return htmlToText.fromString(html);
}

var feedparser = new FeedParser();
var req = request(FEED_URL)



function fetchArticles() {

    var articles_collection = [];


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
            articles_collection.push({title:item.title, description:item.description})
        }
    });

}

function ShowTitle(){

    for (var i;0<i<articles_collection.length; i++){
        console.log(articles_collection[i].title)
    }

}

function  FetchAndShowTitles(){

    var articles = fetchArticles();

    console.log(articles.length)


}




FetchAndShowTitles()

module.exports = FetchAndShowTitles;