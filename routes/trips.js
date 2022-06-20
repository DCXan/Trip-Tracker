const express = require('express')
const router = express.Router()

module.exports = router

let trips = []
let tripID = 1

router.get('/', (req, res) => {
    res.render('view-trips', {trips: trips})
})

router.post('/add-trip', (req, res) => {
    const title = req.body.title
    const photo = req.body.imageURL
    const departDate = req.body.departureDate
    const returnDate = req.body.returnDate
    const trip = {
        title: title,
        photo: photo,
        departDate: departDate,
        returnDate: returnDate,
        tripID: tripID
    }
    tripID += 1
    trips.push(trip)

    res.redirect('/trips')
})

router.get('/add-trip', (req,res) => {
    res.render('add-trip')
})
