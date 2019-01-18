var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

let db = mongoose.connect('mongodb://localhost/bookAPI');

var Book = require('./models/bookModel');
let app = express();
let port = process.env.PORT || 3000;

// let bookRouter = express.Router();
bookRouter = require('./Routes/bookRoutes')(Book);

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use('/api/books', bookRouter);
// app.use('/api/authors', authorRouter);


app.get('/', (req, res) => {
    res.send(`Welcome to my API!`);
});

app.listen(port, () => {
    console.log(`Running on PORT: ${port}`);
});