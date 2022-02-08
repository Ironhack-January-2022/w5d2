const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bookSchema = new Schema({
	title: {
		type: String,
		required: true,
		unique: true
	},
	description: String,
	author: {
		type: Schema.Types.ObjectId,
		// this is the name of the model this id refers to
		ref: 'Author'
	},
	reviews: [
		{
			user: String,
			text: String
		}
	],
	rating: Number
});

const Book = mongoose.model('Book', bookSchema);
module.exports = Book;