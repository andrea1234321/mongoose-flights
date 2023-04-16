import { Flight } from "../models/flight.js"

function index(req,res){
  Flight.find({})
  .then(flights => {
    flights.forEach(function (flight){
      if (flight.departs< new Date()){
        flight.color= 'red'
        console.log(flight)
      }
    })
    res.render('flights/index',{
      flights: flights.sort((a, b) => a.departs - b.departs),
      title: 'All Flights',
    })
  })
  .catch(err=> {
    console.log(err)
    res.redirect('/flights')
  })
}

function newFlight(req,res){
  const departsDate = new Flight().departs.toISOString().slice(0, 16)
  res.render('flights/new', {
    title: 'Add Flight',
    departsDate
  })
}

function create(req,res){
  for (let key in req.body){
    if (req.body[key]=== ''){
      delete req.body[key]
    }
  }
  Flight.create(req.body)
  .then(flight => {
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
  .catch(err=> {
    console.log(err)
    res.redirect('/flights')
  })
}

function edit(req,res){
  Flight.findById(req.params.flightId)
  .then(flight=> {
    res.render('flights/edit', {
      flight: flight,
      title: 'Edit flight'
    })
  })
  .catch(err=> {
    console.log(err)
    res.redirect('/flights')
  })
}

function update(req,res){
  Flight.findByIdAndUpdate(req.params.flightId, req.body, {new: true})
  .then(flight => {
    console.log(flight)
    res.redirect(`/flights/${flight._id}`)
  })
  .catch(err=> {
    console.log(err)
    res.redirect('/flights')
  })
}

export{
  index,
  newFlight as new,
  create,
  deleteFlight as delete,
  show,
  edit, 
  update
}