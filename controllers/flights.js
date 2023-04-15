import { Flight } from "../models/flight.js"

function index(req,res){
  Flight.find({})
  .then(flights => {
    res.render('flights/index',{
      flights: flights,
      title: 'All Flights'
    })
  })
  .catch(err=> {
    console.log(err)
    res.redirect('/flights')
  })
}

function newFlight(req,res){
  res.render('flights/new', {
    title: 'Add Flight'
  })
}

function create(req,res){
  Flight.create(req.body)
  .then(flight => {
    console.log(flight)
    res.redirect('/flights')
  })
  .catch(err=> {
    console.log(err)
    res.redirect('/flights')
  })
}

function deleteFlight(req,res){
  Flight.findByIdAndDelete(req.params.flightId)
  .then(flight=> {
    res.redirect('/flights')
  })
  .catch(err=> {
    console.log(err)
    res.redirect('/flights')
  })
}

function show(req,res){
  Flight.findById(req.params.flightId)
  .then(flight=> {
    res.render('flights/show', {
      flight: flight,
      title: 'Flight detail'
    })
  })
}

export{
  index,
  newFlight as new,
  create,
  deleteFlight as delete,
  show
}