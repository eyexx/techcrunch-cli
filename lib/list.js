var inquirer = require('inquirer');
const request =  require('request');
var FeedParser = require('feedparser');
var htmlToText = require('html-to-text');
var chalk = require('chalk');

var fs = require("fs");
var readline = require("readline");


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
            articles_collection.push({name: chalk.yellow(item.title), value: getTextFromHtml(item.description)})
            if(articles_collection.length === 20){
                ShowTitle(articles_collection)
            }
        }
    });

}

function ShowTitle(collection){

    var articles_collection = collection


    // for (var i=0;i<collection.length; i++){
    //     console.log(collection[i].title)
    // }

    inquirer.prompt(
        [{
            type: 'list',
            name: 'description',
            // message: 'Medium - Top Stories',
            message: 'Select the article to read :',
            choices: articles_collection,
            pageSize: 20
        }]
    ).then(function (answers) {
        console.log(answers.description)
    })

}

function  FetchAndShowTitles(){

    var articles = fetchArticles();


}




fetchArticles()

module.exports = fetchArticles;