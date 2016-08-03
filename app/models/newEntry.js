var mongoose = require('mongoose');
module.exports = mongoose.model('NewEntry', {
    name: {
        type: String,
        default: ''
    }
});
