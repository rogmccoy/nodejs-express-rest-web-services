var express = require('express');
var mongoose = require('mongoose');

const { MongoClient, ObjectID } = require('mongodb');

let db = mongoose.connect('mongodb://localhost/bookAPI');
console.log(db);

var Book = require('./models/bookModel');
let app = express();
let port = process.env.PORT || 3000;

let bookRouter = express.Router();

app.use('/api', bookRouter);
bookRouter.route('/books')
    .get((req, res) => {
        console.log(req);
        
        var a_query = {};

        if(req.query.genre) {
            a_query.genre = req.query.genre;
        }
        if(req.query.author) {
            a_query.author = req.query.author;
        }
        if(req.query.title) {
            a_query.title = req.query.title;
        }
        Book.find(a_query, (err, books) => {
            if(err) {
                console.log(err);                
            } else {
                res.json(books);
            }
        });
        // const url = 'mongodb://localhost:27017';
        // const dbName = 'bookAPI';

        // (async function mongo() {
        //     let client;
        //     try {
        //       client = await MongoClient.connect(url);
        //       console.log(`connected to db`);      
        //       const db = client.db(dbName);
      
        //       // collection is kind of like a table...but not really??
        //       const col = await db.collection('bookAPI');
      
        //       const books = await col.find().toArray();
              
        //       res.json(books);
        //     } catch (err) {
        //       res.status(500).send(err.stack);
        //     }
        //     client.close();
        //   }());
        // console.log(db);
        // const mongoModel = db.then((v) => {
        //     console.log(v);
            
        // });
        // console.log(Book);
        // console.log(`Book: ${Book}`);
        
        // console.log(mongoModel);
    });

bookRouter.route('/Books/:bookId')
    .get()

app.get('/', (req, res) => {
    res.send(`Welcome to my API!`);
});

app.listen(port, () => {
    console.log(`Running on PORT: ${port}`);
});