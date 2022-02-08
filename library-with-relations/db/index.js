const mongoose = require('mongoose')
require('dotenv').config()
const connectionString = process.env.MONGO_URI || 'mongodb://localhost:27017/my-library'
console.log('this is the key: ', connectionString)
mongoose.connect(connectionString)
	.then(db => console.log(`Connected to database ${db.connections[0].name}`))
	.catch(err => console.log(`Error while creating connection ${err}`))

