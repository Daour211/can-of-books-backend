'use strict';

const express = require('express');
const cors = require('cors');
require('dotenv').config();

const mongoose = require('mongoose');
mongoose.connect(`${process.env.MONGODB_URI}`, { useNewUrlParser: true, useUnifiedTopology: true });
// mongodb://localhost:27017/books
// mongodb+srv://Daour995:daour995@can-of-books-301-d20.aa3bb.mongodb.net/books?retryWrites=true&w=majority
const server = express();
server.use(express.json());
server.use(cors());

const PORT = process.env.PORT;
const userModel = require ('./modules/user');

server.listen(PORT, () => {
    console.log(`listening on PORT ${PORT}`);
})

server.get('/', homePage);

function homePage(req, res) {
    res.send('you are on the Home Page')
}




server.get('/books', booksHandler);

function booksHandler(req, res) {
    let userEmail = req.query.email;

    userModel.find({ email:userEmail }, function (err, userData) {
        if (err) {
            console.log('did not work')
        } else {
            console.log(userData)
            res.send(userData[0].books)
        }
    })

}


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

server.put('/updateBook/:index', updateBook)

function updateBook(req, res) {
    console.log(req.body);

    const { bookName, bookDescription, imgURL, bookStatus, email } = req.body;
    let index = req.params.index




    userModel.findOne({ email: email }, (err, updatedData) => {
        // console.log(updatedData[0].books[index]);
        // updatedData[0].books[index]=req.body;
        // console.log(updatedData.books);

        updatedData.books.splice(index, 1, {
            name: bookName,
            description: bookDescription,
            status: bookStatus,
            imgURL: imgURL
        })
        updatedData.save();
        res.send(updatedData);
    })
}
