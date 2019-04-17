var mongoose = require('mongoose');
let db = {
	localhost: 'mongodb://localhost:27017/Chat_User',
	mlab: 'mongodb://howard:asdf1234@ds159164.mlab.com:59164/howard_todo'
};
mongoose.Promise = global.Promise;
// mongoose.connect(db.localhost).then((db) => {}, (err) => {
// 	mongoose.connect(db.mlab);
// });

// mongoose.connect(process.env.MONGODB_URI);
mongoose.connect(db.mlab);

module.exports = {
	mongoose: mongoose
};