require('dotenv').config({path: __dirname + '/../.env'})
const express = require('express')
const session = require('express-session')
const {SERVER_PORT, SESSION_SECRET} = process.env
const checkForSession = require('./middlewares/checkForSession')
const sCtrl = require('./controllers/swagController')
const aCtrl = require('./controllers/authController')
const cCtrl = require('./controllers/cartController')
const searchCtrl = require('./controllers/searchController')


app = express()
app.use(express.json())

app.use(session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: true
}))
app.use(checkForSession)
app.use(express.static(`${__dirname}/../build`));

//swag

app.get('/api/swag', sCtrl.read)

//auth

app.post('/api/login', aCtrl.login)
app.post('/api/register', aCtrl.register)
app.post('/api/signout', aCtrl.signout)
app.get('/api/user', aCtrl.getUser)

//cart

app.post('/api/cart/checkout', cCtrl.checkout)
app.post('/api/cart/:id', cCtrl.add)
app.delete('/api/cart/:id', cCtrl.delete)

//search

app.get('/api/search', searchCtrl.search)





app.listen(SERVER_PORT, () => {
    console.log(`Server is listening on port ${SERVER_PORT}`)
})