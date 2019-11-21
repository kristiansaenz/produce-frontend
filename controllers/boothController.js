const ObjectId = require('mongodb').ObjectID;
const zipToCoordinates = require('./helpers')
const BoothModel = require('../models/BoothModel.js')

module.exports = {
  getAllBooths: function (req, res) {
    BoothModel.find(function (err, Booths) {
      if (err) {
        return res.status(500).json({
          message: 'Error when getting Booths.',
          error: err
        });
      }
      return res.json(Booths);
    });
  },

  create: function (req, res) {

    // convert given zip to full address attribute to save in db
    let coordinates = zipToCoordinates(req.body.zip)
    coordinates.then(result => {

      let search_address = result.city + ' ' + result.state

      const Booth = new BoothModel({
        address: result,
        searchAddress: result.city,
        rating: 0,
        reviews: [],
        booth_name: req.body.booth_name,
        description: req.body.description,
        produce: [],
        images: []
      })




      Booth.save(Booth, function (err, result) {
        if (err) throw err;
        if (result) console.log('Booth Created Successfully!')
        return res.json(Booth)

      // include a req body field with the logged in user's _id to search mongo
      // then add the Booth response object id to the UserModel id field.

      })
    })
  },

  getBoothById: function (req, res) {
    let id = req.params.id;

    BoothModel.findOne({
      _id: id
    }, function (err, booth) {
      if (err) {
        console.log(err);
      }
      if (booth) {
        console.log(booth)
        res.json(booth);
      }
    });
  },

  filterByLocation: function (req, res) {
    let city = req.query.city;
    console.log(city)

    if (city !== '') {
      BoothModel.find({
        'address.city' : new RegExp(city, 'i')
        // 'searchAddress': new RegExp(city, 'i')
      }).exec(function (err, results) {
        if (err) {
          return res.status(500).json({
            message: "Error when filtering Booths...",
            error: err
          });
        }
        console.log(results);
        return res.json(results);
      })
    } else {
      // Temporary fix: when submitting search with no value, return all booths
      BoothModel.find(function (err, Booths) {
        if (err) {
          return res.status(500).json({
            message: 'Error when getting Booths.',
            error: err
          });
        }
        return res.json(Booths);
      });
    }
  }
}