# Weekly Assignment 2


### continue to work with the files collected in Weekly Assignment 1. I was assigned the file m08
### answer questions: 
### why are we reading this from a saved text file instead of making another http request?" 
### save time and energy for the page do not need to redownload information from the original url.
### Study the HTML structure of this file: 
### this is very important for me to design how I should work. detailed notes are in the js file(comments for each line)


##  Some Notes for Code  (more details in js file)
```javascript
// choose the needed information based on style
$('td[style="border-bottom\\:1px solid #e3e3e3; width\\:260px"]').each(function(i, elem) {

// can also use find to extract text from h4 element, some information are missing: 
const venue = $(elem).find('h4').text().split('<br>');

//push elemenets into the empty arrary,trim may contain some problems, need to pay extra attention
address08.push(street.trim().split(',')[0]);
```

## Thoughts:
## I have tried many methods to figure out the assignment 2. Learn how to right the ask questions for help. ";/''" matters a lot to JS. Remember to try the second method out by using nodes value. 
