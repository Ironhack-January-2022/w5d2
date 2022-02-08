module.exports = function (app) {
	app.use((req, res) => res.render('404'))
	app.use((err, req, res, next) => {
		console.error(err.stack)
		next(err)
	})
	app.use((err, req, res, next) => {
		if (req.xhr) {
			res.status(500).send({ error: 'Something failed!' })
		} else {
			next(err)
		}
	})
	app.use((err, req, res, next) => {
		res.status(500)
		res.render('error', { error: err })
	})
}