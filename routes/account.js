const express = require('express')
const tripRouter = require('./trips')
const authRouter = express.Router()

authRouter.use('/trips', tripRouter)

let users = [
    {username: 'david', password: '123', id: 1},
    {username: 'guest', password: '123', id: 2}
]

authRouter.get('/login', (req, res) => {
    res.render('login')
})

authRouter.post('/login', (req, res) => {
    const username = req.body.username
    const password = req.body.password
    const activeUser = users.find(user => {
        return user.username == username && user.password == password
    })

    if (activeUser) {
        if (req.session) {
            req.session.user = activeUser
        }
        
        res.redirect('/trips')

    } else {
        res.render('login', {errorMessage: 'Incorrect username and/or password.'})
    }
})

authRouter.post('/logout', (req, res) => {
    if (req.session) {
        req.session.destroy()
    }
    res.render('login', {logoutMessage: 'You have been logged out.'})
})

authRouter.get('/register', (req, res) => {
    res.render('register')
})

authRouter.post('/register', (req, res) => {
    const username = req.body.username
    const password = req.body.password
    const newUser = {username: username, password: password}
    users.push(newUser)

    res.redirect('/login')
})

module.exports = authRouter