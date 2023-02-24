const express = require('express');
const bodyParser = require('body-parser');
const _ = require('lodash');

const homeStartingContent = "It's a wonderful day in life. Welcome to homepage";
const aboutContent = 'This is a about page.';
const contactContent = 'This is a contact page.';

const posts = [];

const app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended : true}));
app.use(express.static('public'));


app.get('/', function(req, res){
    res.render('home', {
        homeContent: homeStartingContent,
        newPost: posts
    });
});

app.get('/about', function(req, res){
    res.render("about", {aboutPageContent : aboutContent});
});

app.get('/contact', function(req, res){
    res.render("contact", {contactPageContent : contactContent});
});


app.get('/compose', function(req, res){
    res.render("compose");
});


app.get('/posts/:topic', function(req, res){
    posts.forEach(function(element){
        if (_.lowerCase(element.title) === _.lowerCase(req.params.topic)){
            res.render('post', {
                postTitle: element.title, 
                postContent: element.body
            });
        }
    });
   
});


app.post('/compose', function(req,res){
    const content = {title:req.body.postTitle, body: req.body.postBody};
    posts.push(content);
    res.redirect('/');
})






app.listen(3000, function(){
    console.log('app is running on port 3000.');
});

