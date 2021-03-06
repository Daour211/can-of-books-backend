'use strict';
const mongoose = require('mongoose');


const BookSchema = new mongoose.Schema({
    name: '',
    description: '',
    stats: '',
    imgURL:''

});

const userSchema = new mongoose.Schema({
    email: String,
    books: [BookSchema]
});


const bookModel = mongoose.model('book', BookSchema);

const userModel = mongoose.model('user', userSchema);






function bookData() {
    const book1 = new bookModel({

        name: '1984',
        description: 'Nineteen Eighty-Four: A Novel, often referred to as 1984, is a dystopian social science fiction novel by the English novelist George Orwell',
        status: 'available',
        imgURL: 'https://target.scene7.com/is/image/Target/GUEST_f0bc34a6-e4a2-4b71-b133-44fb400fed5b?wid=488&hei=488&fmt=pjpeg'
    })
    const book2 = new bookModel({
        name: 'And Then There Were None',
        description: 'The story follows 10 strangers who receive an unusual invitation to a solitary mansion based remotely off Britain\'s Devon Coast. Among the guests is an unstable doctor, an anxious businessman, an irresponsible playboy, and a governess with a secret. Cut off from the outside world, the group arrives at its destination, only to find that darkness awaits them. As people start to mysteriously die, the members of the group realize there is a killer among them',
        status: 'available',
        imgURL: 'https://images-eu.ssl-images-amazon.com/images/I/51MlxNgCsyL._SY264_BO1,204,203,200_QL40_FMwebp_.jpg'
    })
    const book3 = new bookModel({
        name: 'Why Men Don\'t Have a Clue and Women Always Need More Shoes',
        description: 'Why Men Don’t Have a Clue and Women Always Need More Shoes takes a look at some of the issues that have confused men and women for centuries. Using new findings on the brain, studies of social changes, evolutionary biology, and psychology, the Peases teach you how to make the most of your relationships—or at least begin to understand where your partner is coming from.',
        status: 'available',
        imgURL: 'https://images-na.ssl-images-amazon.com/images/I/51n4AHAkUVL._SX323_BO1,204,203,200_.jpg'



    })
   
    book1.save()
    book2.save()
    book3.save()
}
bookData()


function usersData() {
    const abdelrahman = new userModel({

        email: 'daour.211@gmail.com',
        books: [
            {
                name: '1984',
                description: 'Nineteen Eighty-Four: A Novel, often referred to as 1984, is a dystopian social science fiction novel by the English novelist George Orwell',
                status: 'available',
                imgURL:'https://target.scene7.com/is/image/Target/GUEST_f0bc34a6-e4a2-4b71-b133-44fb400fed5b?wid=488&hei=488&fmt=pjpeg'
            },
            {
                name: 'And Then There Were None',
                description: 'The story follows 10 strangers who receive an unusual invitation to a solitary mansion based remotely off Britain\'s Devon Coast. Among the guests is an unstable doctor, an anxious businessman, an irresponsible playboy, and a governess with a secret. Cut off from the outside world, the group arrives at its destination, only to find that darkness awaits them. As people start to mysteriously die, the members of the group realize there is a killer among them',
                status: 'available',
                imgURL:'https://images-eu.ssl-images-amazon.com/images/I/51MlxNgCsyL._SY264_BO1,204,203,200_QL40_FMwebp_.jpg'
            },
            {
                name: 'Why Men Don\'t Have a Clue and Women Always Need More Shoes',
                description: 'Why Men Don’t Have a Clue and Women Always Need More Shoes takes a look at some of the issues that have confused men and women for centuries. Using new findings on the brain, studies of social changes, evolutionary biology, and psychology, the Peases teach you how to make the most of your relationships—or at least begin to understand where your partner is coming from.',
                status: 'available',
                imgURL:'https://images-na.ssl-images-amazon.com/images/I/51n4AHAkUVL._SX323_BO1,204,203,200_.jpg'
            }

        ]
    })

    abdelrahman.save();
}
usersData();


// function booksHandler(req, res) {
//     let userEmail = req.query.email;

//     userModel.find({ email:userEmail }, function (err, userData) {
//         if (err) {
//             console.log('did not work')
//         } else {
//             console.log(userData)
//             res.send(userData[0].books)
//         }
//     })

// }

module.exports = userModel