var inquirer = require('inquirer');
const request =  require('request');
var FeedParser = require('feedparser');
var htmlToText = require('html-to-text');
var chalk = require('chalk');
var reader =require('./reader');

const FEED_URL = "https://techcrunch.com/feed/"

function getTextFromHtml(html) {
    return htmlToText.fromString(html);
}

var feedparser = new FeedParser();
var req = request(FEED_URL)

var separator = "-";

var separator_for_text = separator.repeat(80);

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
        var space = " ";
        var separator = " - ";
        var head_line = "";

        while (item = stream.read()) {

            var title =  chalk.yellow(item.title);
            var author = chalk.cyan( "by" + space +item.author);

            head_line = title + separator + author

            articles_collection.push({name: head_line,
                value: separator_for_text +"\n\n"+ getTextFromHtml(item.description)})
            if(articles_collection.length === 20){
                ShowTitles(articles_collection)
            }
        }
    });

}

function ShowTitles(collection){

    var articles_collection = collection


    inquirer.prompt(
        [{
            type: 'list',
            name: 'description',
            message: 'Select the article to read :',
            choices: articles_collection,
            pageSize: 20
        }]
    ).then(function (answers) {
        reader.show(answers.description)
    })

}


fetchArticles()

module.exports = {
    fetchArticles: fetchArticles
};
