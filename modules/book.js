'use strict';

// module.exports = BookSchema
const mongoose = require('mongoose');

const BookSchema = new mongoose.Schema({
    name: '',
    description: '',
    stats:''

});

module.exports = BookSchema
