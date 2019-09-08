# Weekly Assignment 2


### continue to work with the files collected in Weekly Assignment 1. I was assigned the file m08
### answer questions: 
### why are we reading this from a saved text file instead of making another http request?" 
### save time and energy for the page do not need to redownload information from the original url.
### Study the HTML structure of this file: 
### this is very important for me to design how I should work. detailed notes are in the js file(comments for each line)


## Starter Code  

```javascript
// npm install cheerio

var fs = require('fs');
var cheerio = require('cheerio');

// load the thesis text file into a variable, `content`
// this is the file that we created in the starter code from last week
var content = fs.readFileSync('data/thesis.txt');

// load `content` into a cheerio object
var $ = cheerio.load(content);

// print (to the console) names of thesis students
$('h3').each(function(i, elem) {
    console.log($(elem).text());
});

// write the project titles to a text file
var thesisTitles = ''; // this variable will hold the lines of text

$('.project .title').each(function(i, elem) {
    thesisTitles += ($(elem).text()).trim() + '\n';
});

fs.writeFileSync('data/thesisTitles.txt', thesisTitles);
```

## Thoughts:
## Learn how to right the ask questions for help. ";/''" matters a lot to JS. Remember to try the second method out by using nodes value. 
