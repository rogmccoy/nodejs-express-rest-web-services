let bookController = function(Book) {
    let post = function(req, res) {
        let book = new Book(req.body);
        if (!req.body.title) {
            res.status(400);
            res.send('Title is required');
        }
        book.save();
        console.log(book);
        res.status(201).send(book);
    };
    let get = function(req, res) {

        var a_query = {};

        if (req.query.genre) {
            a_query.genre = req.query.genre;
        }
        if (req.query.author) {
            a_query.author = req.query.author;
        }
        if (req.query.title) {
            a_query.title = req.query.title;
        }
        Book.find(a_query, (err, books) => {
            if (err) {
                console.log(err);
            } else {

                let returnBooks = [];
                books.forEach((element, indes, array) => {
                    let newBook = element.toJSON();
                    newBook.links = {};
                    newBook.links.self = 'http://' + req.headers.host + '/api/books/' + newBook._id;
                    returnBooks.push(newBook);
                });
                res.json(returnBooks);
            }
        });
    };

    return {
        post: post,
        get: get
    };
};

module.exports = bookController;