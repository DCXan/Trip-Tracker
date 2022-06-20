const express = require('express')
const mustacheExpress = require('mustache-express')

const app = express()

app.use(express.urlencoded({extended: true}))

const tripsRouter = require('./routes/trips')
app.use('/trips', tripsRouter)

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