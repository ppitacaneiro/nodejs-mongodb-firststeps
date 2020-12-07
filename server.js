const { request, response } = require('express');
const express = require('express');
const bodyParser = require('body-parser');
const { MongoClient } = require('mongodb');
const mongoClient = require('mongodb').MongoClient;
const app = express();
const connectionString = 'mongodb+srv://ppita:abc1234.@cluster0.lh1sd.mongodb.net/star-wars?retryWrites=true&w=majority';

MongoClient.connect(connectionString, {
    useUnifiedTopology: true 
}).then(client => {
    console.log('Connect to database!');
    const db = client.db('star-wars-quotes');
    const quotesCollection = db.collection('quotes');

    app.set('view engine', 'ejs');

    app.post('/quotes', (request,response) => {
        quotesCollection.insertOne(request.body)
        .then(result => {
            // console.log(result);
            response.redirect('/');
        })
        .catch(error => console.error(error)) 
        // console.log(request.body);
    });

    app.get('/', (request,response) => {
        db.collection('quotes').find().toArray()
        .then(result => {
            response.render('index.ejs', {quotes:result});
            // console.log(result);
        }).catch(error => console.error(error));
        // response.sendFile(__dirname + '/index.html');
    });    

}).catch(error => console.error(error));

app.listen(3000, function() {
    console.log('listening on port 3000');
});

app.use(bodyParser.urlencoded({extended:true}));


