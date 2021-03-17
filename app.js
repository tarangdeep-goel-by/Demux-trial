const express = require('express')
const app = express()
const request = require('request')
const dotenv = require('dotenv')
dotenv.config()
//Middleware
app.set("view engine", "ejs")
app.use('/public', express.static('public'))
// routing
app.get('/', (req, res) => {
    res.render("Home")
    //res.send('Home page for Tarang')
})

app.get('/About', (req, res) => {
    
    res.send('About page for Tarang')
})

app.get('/dummy', (req, res) => {
    
    res.render("dummy")
})

app.get('/result', (req, res) => {
    console.log(req.query)
    //res.send(`You searched for ${req.query.movieName}`)
    const url = `http://www.omdbapi.com/?apikey=${process.env.API_KEY}&s=${req.query.movieName}`
    request(url, function(error, response, body){
        if(!error && response.statusCode === 200){
            const data = JSON.parse(body)
            //res.send(data)
            res.render('result', {moviesDump : data})
        }
        else {
            res.send('Something went wrong')
        }
    })
})

app.get('/result/:id', (req, res) => {
    const url = `http://www.omdbapi.com/?apikey=${process.env.API_KEY}&i=${req.params.id}`
    request(url, function(error, response, body){
        if(!error && response.statusCode === 200){
            const data = JSON.parse(body)
            //res.send(data)
            res.render('detail', {data : data})
        }
        else {
            res.send('Something went wrong')
        }
    })
})

// app.post('/result', (req, res) => {
//     console.log(req.query)
//     res.send(`You searched for ${req.query.movieName}`)
// })

// app.post('/result', (req, res) => {
//     console.log(req.query)
//     res.send(`You searched for ${req.query}`)
// })

app.get('*', (req, res) => {
    res.send('404 not found')
})

app.listen(3000, () => {
    console.log("Server has started")
})