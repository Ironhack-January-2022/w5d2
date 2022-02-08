const express = require('express')
const router = express.Router()
const Book = require('../models/Book')
const Author = require('../models/Author')

router.get('/', (req, res) => {
	res.render('home')
})

router.get('/books', (req, res, next) => {
	// get all the books from the db
	Book.find()
		.then(booksFromDB => {
			console.log(booksFromDB)
			// render a view
			res.render('books/index', { books: booksFromDB })
		})
		.catch(err => next(err))
	// render a view and display the titles
})

router.get('/books/add', (req, res, next) => {
	// we need to get all the authors from the db to use them 
	// in the select
	Author.find()
		.then(authorsFromDB => {
			console.log(authorsFromDB)
			res.render('books/add', { authors: authorsFromDB })
		})
		.catch(err => next(err))
});

router.get('/books/:id', (req, res, next) => {
	// retrieve that book from the db
	const id = req.params.id
	console.log(id)
	// populate replaces the id with all the fields from the author document
	Book.findById(id).populate('author')
		.then(bookFromDB => {
			console.log(bookFromDB)
			res.render('books/detail', { book: bookFromDB })
		})
		.catch(err => next(err))
})

router.post('/books', (req, res, next) => {
	// get the values from request body	
	// console.log(req.body)
	const { title, author, description, rating } = req.body
	// create a new book in the db
	Book.create({ title, author, description, rating })
		.then(createdBook => {
			console.log(createdBook)
			// res.render('books/detail', { book: createdBook })
			// redirect to the detail view of that book
			res.redirect(`/books/${createdBook._id}`)
		})
		.catch(err => next(err))
});

router.get('/books/edit/:id', (req, res, next) => {
	// get that book from the db	
	const id = req.params.id
	Book.findById(id)
		.then(bookFromDB => {
			res.render('books/edit', { book: bookFromDB })
		})
		.catch(err => next(err))
});

router.post('/books/update/:id', (req, res, next) => {
	const { title, description, author, rating } = req.body
	// by passing {new true} as a third param findByIdAndUpdate returns 
	// the updated book
	Book.findByIdAndUpdate(req.params.id, {
		title,
		description,
		author,
		rating
	}, { new: true })
		.then(updatedBook => {
			console.log(updatedBook)
			res.redirect(`/books/${updatedBook._id}`)
		})
});

router.get('/books/delete/:id', (req, res, next) => {
	const id = req.params.id
	Book.findByIdAndDelete(id)
		.then(deletedBook => {
			console.log(deletedBook)
			res.redirect('/books')
		})
		.catch(err => next(err))
});

// route to add a review
router.post('/books/:id/reviews', (req, res, next) => {
	const id = req.params.id
	const { user, text } = req.body
	Book.findByIdAndUpdate(id, { $push: { reviews: { user: user, text: text } } })
		.then(updatedBook => {
			console.log(updatedBook)
			res.redirect(`/books/${updatedBook._id}`)
		})
});


module.exports = router