const Artist = require("../models/Artist");
const router = require("express").Router();
const randomLocation = require('random-location')

//get all artists
router.get("/map", (req, res, next) => {
  Artist.find()
       .then(artists => {
         res.status(200).json(artists)
       })

       .catch(err => next(err))
})

//get specific artist
router.get("/map/:id", (req, res, next) => {
  Artist.findById(req.params.id)
          .then(artist => {
            res.status(200).json(artist)
          })
          .catch(err => next(err))
})

//create an artists
router.post("/addArtist", (req, res, next) => {
  const longitude = req.body.longitude
  const latitude = req.body.latitude
  const name = req.body.name
  const picture = req.body.picture
  const discription = req.body.discription
  const popularity = req.body.popularity
  const spotifyLink = req.body.spotifyLink
  const tracks = req.body.tracks

  console.log(tracks)

  const vienna = {
    center : {
      latitude : 48.21377358548916,
      longitude : 16.369123862931218,
    } , 

    radius : 7500
  }

  const createViennaCoords = () => {
    var viennaCoords = randomLocation.randomCirclePoint(vienna.center, vienna.radius)
    return [viennaCoords.longitude, viennaCoords.latitude]
  }


  const paris = {
    center : {
      latitude : 48.855706548961834, 
      longitude : 2.3444730709344204,
    } , 

    radius : 6500
  }

  const createParisCoords = () => {
    var parisCoords = randomLocation.randomCirclePoint(paris.center, paris.radius)
    return [parisCoords.longitude, parisCoords.latitude]

  }

  const london = {
    center : {
      latitude : 51.513779852328284, 
      longitude : -0.09751071091299453,
    } , 

    radius : 17500
  }

  const createLondonCoords = () => {
    var londonCoords = randomLocation.randomCirclePoint(london.center, london.radius)
    return [londonCoords.longitude, londonCoords.latitude]
  }


  const madrid = {
    center : {
      latitude : 40.42447458233723, 
      longitude : -3.696949038371607,
    } , 

    radius : 10000
  }

  const createMadridCoords = () => {
    var madridCoords = randomLocation.randomCirclePoint(madrid.center, madrid.radius)
    return [madridCoords.longitude, madridCoords.latitude]
  }


  const rome = {
    center : {
      latitude : 41.91434431977642,  
      longitude : 12.505372936264408,
    } , 

    radius : 10000
  }
  const createRomeCoords = () => {
    var romeCoords = randomLocation.randomCirclePoint(rome.center, rome.radius)
    return [romeCoords.longitude, romeCoords.latitude]
  }

  //berlin original
  Artist.create({
    coordinates : [Number(longitude), Number(latitude)],
    name : name,
    picture : picture,
    discription : discription,
    popularity : popularity,
    spotifyLink : spotifyLink,
    tracks : tracks,
    city : "berlin"
  })


  //vienna copy
  Artist.create({
    coordinates : createViennaCoords(),
    name : name,
    picture : picture,
    discription : discription,
    popularity : popularity,
    spotifyLink : spotifyLink,
    tracks : tracks,
    city : "vienna"
  })


  //paris copy
  Artist.create({
    coordinates : createParisCoords(),
    name : name,
    picture : picture,
    discription : discription,
    popularity : popularity,
    spotifyLink : spotifyLink,
    tracks : tracks,
    city : "paris"
  })


  //london copy
  Artist.create({
    coordinates : createLondonCoords(),
    name : name,
    picture : picture,
    discription : discription,
    popularity : popularity,
    spotifyLink : spotifyLink,
    tracks : tracks,
    city : "london"
  })


  //madrid copy
  Artist.create({
    coordinates : createMadridCoords(),
    name : name,
    picture : picture,
    discription : discription,
    popularity : popularity,
    spotifyLink : spotifyLink,
    tracks : tracks,
    city : "madrid"
  })


  //rome copy
  Artist.create({
    coordinates : createRomeCoords(),
    name : name,
    picture : picture,
    discription : discription,
    popularity : popularity,
    spotifyLink : spotifyLink,
    tracks : tracks,
    city : "rome"
  })



  .then(artist => {
    res.status(201).json(artist)
  })
  .catch(err => next(err))

})



module.exports = router;
