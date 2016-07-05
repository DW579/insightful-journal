// grab the mongoose module
var mongoose = require('mongoose');

// define our NewEntry model
// module.exports allows us to pass this to other files when it is called
module.exports = mongoose.model('NewEntry', {
    name : {type : String, default: ''}
});
