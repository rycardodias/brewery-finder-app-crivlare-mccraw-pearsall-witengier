require('dotenv').config()
const express = require('express')
const exphbs = require('express-handlebars')
const session = require('express-session')
const MySQLFavorites = require('express-mysql-session')(session);
const db = require('./db')
const htmlRoutes = require('./routes/html-routes')
const app = express()

const favoritesRoutes = require('./routes/favorites')
const usersRoutes = require('./routes/users')
const breweryRoutes = require('./routes/brewery')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const sessionFavorites = new MySQLFavorites({}, db);
app.use(session({
    key: 'session_cookie',
    secret: process.env.SESSION_SECRET,
    store: sessionFavorites,
    resave: false,
    saveUninitialized: false,
    proxy: true,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24
    }
}))

app.engine('handlebars', exphbs.engine())
app.set('view engine', 'handlebars')

app.use(express.static('public'))

app.use('/api/favorites', favoritesRoutes)
app.use('/api/users', usersRoutes)
app.use('/api/brewery', breweryRoutes)

app.use('/', htmlRoutes)


module.exports = app

