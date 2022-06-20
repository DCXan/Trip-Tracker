const express = require('express')
const mustacheExpress = require('mustache-express')
const session = require('express-session')
const authenticationMW = require('./middleware/authentication')

const app = express()

app.use(express.urlencoded({extended: true}))

app.use(session({
    secret: 'secretkey',
    saveUninitialized: true,
    resave: true
}))

const tripsRouter = require('./routes/trips')
app.use('/trips', authenticationMW, tripsRouter)

const authRouter = require('./routes/account')
app.use('/', authRouter)

app.engine('mustache', mustacheExpress())
app.set('views', './views')
app.set('view engine', 'mustache')

let port = 3000
app.listen(port, () => {
    console.log(`Server is running on port ${port}.`)
})

app.get('/', (req, res) => {
    res.send('/root')
})