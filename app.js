const express = require('express')
const app = express()

const mongoose = require('mongoose')
// To hide Mongodb credentials in .env
require('dotenv/config')
// import body-parser
const bodyParser = require('body-parser')

// Connect to posts route
const postsRoute = require('./routes/posts')

app.use(bodyParser.json()) // Our data comes in json (this line must be before app.use postsRoute)
app.use('/posts', postsRoute)

// Home route
app.get('/', (req, res) =>{
    res.send('Homepage')
})

// Connection string in .env file (use dotenv package)
mongoose.connect(process.env.DB_CONNECTOR, ()=>{
    console.log('DB is now connected!')
})

app.listen(3000, () =>{
    console.log('Server is up and running...')
})