const express = require('express')
const tripRouter = express.Router()

let trips = []
let tripID = 1

tripRouter.get('/', (req, res) => {
    let userTrips = trips.filter(trip => trip.userID == req.session.user.id)
    res.render('view-trips', {trips: userTrips})
})

tripRouter.post('/add-trip', (req, res) => {
    const title = req.body.title
    const photo = req.body.imageURL
    const departDate = req.body.departureDate
    const returnDate = req.body.returnDate
    const trip = {
        title: title,
        photo: photo,
        departDate: departDate,
        returnDate: returnDate,
        userID: req.session.user.id,
        tripID: tripID
    }
    tripID += 1
    trips.push(trip)

    res.redirect('/trips')
})

tripRouter.get('/add-trip', (req,res) => {
    res.render('add-trip')
})

tripRouter.post('/delete-trip', (req, res) => {
    const tripID = req.body.tripID
    trips = trips.filter(trip => trip.tripID != tripID)

    res.redirect('/trips')
})




module.exports = tripRouter