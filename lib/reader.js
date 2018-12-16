var str = require('string-to-stream');
var pager = require('default-pager');




function printArticles(text){

    str(text).pipe(pager(function () {
        console.log('(END)');
    }));

}

function show(text) {
    printArticles(text)
}

module.exports = {
    show: show
};
