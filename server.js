'use strict';

const express = require('express');
const cors = require('cors');
require('dotenv').config();

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/books', { useNewUrlParser: true, useUnifiedTopology: true });

const server = express();
server.use(express.json());
server.use(cors());

const PORT = process.env.PORT;
const booksHandler = require ('./modules/user');

server.listen(PORT, () => {
    console.log(`listening on PORT ${PORT}`);
})

server.get('/', homePage);

function homePage(req, res) {
    res.send('you are on the Home Page')
}




server.get('/books', booksHandler);




server.post('/addbook', addingBooks);

function addingBooks(req, res) {
    console.log("its working")
    console.log(req.body);

    const { email, newBookName, newDescription, newImg, newStatus } = req.body

    userModel.find({ email: email }, (err, addToData) => {
        if (err) {
            res.send('not working');
            console.log('not working');
        } else {
            console.log('before pushing', addToData)
            addToData[0].books.push({
                name: newBookName,
                description: newDescription,
                status: newStatus,
                imgURL: newImg
            })
            console.log('after pushing', addToData[0])
            addToData[0].save()
            res.send(addToData[0])
        }
    })

}

server.delete('/deleteBook/:index', deleteBook)
// app.delete('/deleteCat/:index',deleteCatHandler);

function deleteBook(req, res) {
    let email = req.query.email;
    let index = req.params.index

    console.log('inside delete')
    console.log(email, index);

    userModel.find({ email: email }, (err, data) => {
        const deleteFromData = data[0].books.filter((book, idx) => {
            if (index != idx) {
                return book
            }
        })
        data[0].books = deleteFromData
        data[0].save()
        res.send(data[0].books)

    })


}

