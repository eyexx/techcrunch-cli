var inquirer = require('inquirer');
const request = require('request');
var FeedParser = require('feedparser');
var htmlToText = require('html-to-text');
var chalk = require('chalk');
var reader = require('./reader');

const BASE_URL = "https://techcrunch.com/"

function getTextFromHtml(html) {
    return htmlToText.fromString(html);
}

function isString(str) {
    if(typeof str === "string"){
        return true;
    }
};

function validateKeyword(keyword){

    if(!isString(keyword)){
        console.log("please string keyword")
        process.exit(1)
    }

}

function fetchArticles(url) {

    var feedparser = new FeedParser();
    var req = request(url)

    var separator = "-";

    var separator_for_text = separator.repeat(80);

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

            var title = chalk.yellow(item.title);
            var author = chalk.cyan("by" + space + item.author);

            head_line = title + separator + author

            articles_collection.push({
                name: head_line,
                value: separator_for_text + "\n\n" + getTextFromHtml(item.description)
            })
        }
    });

    feedparser.on('end', function () {

        if(!articles_collection.length){
            console.log("Sorry, no articles found")
            process.exit(1);
        }

        ShowTitles(articles_collection)

    });


}

function searchArticlesByWord(keyword) {

    const SEARCH_URL = BASE_URL + "search/" + keyword + "/feed"

    fetchArticles(SEARCH_URL)

}

function getArticlesByTag(keyword) {

    const TAG_URL = BASE_URL + "tag/" + keyword + "/feed"

    fetchArticles(TAG_URL)

}


function getTopArticles() {

    const HEADLINES_URL = BASE_URL + 'feed'

    fetchArticles(HEADLINES_URL)


}

function ShowTitles(collection) {

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


getArticlesByTag("")

isString("zz")

module.exports = {
    getTopArticles: getTopArticles,
    searchArticlesByWord: searchArticlesByWord,
    getArticlesByTag: getArticlesByTag
};
