// api.js

const express = require("express");
const router = express.Router();

// Require Journal model
const Journal = require("../models/journal");

// Define add route (CREATE)
router.route("/add").post(function(req, res) {
  let journal = new Journal(req.body);

  journal
    .save()
    .then(business => {
      res.status(200).json("Added journal entry successfully");
    })
    .catch(err => {
      res.status(400).send("Unable to save entry to db");
    });
});

// Define get route (READ)
router.route("/").get(function(req, res) {
  Journal.find(function(err, entries) {
    if (err) {
      cosnole.log(err);
    } else {
      res.json(entries);
    }
  });
});

//define edit (UPDATE)
router.route("/update/:id").post(function(req, res) {
  Journal.findById(req.params.id, function(err, entry) {
    if (!entry) {
      res.status(404).send("Entry not found or doesn't exist.");
    } else {
      entry.title = req.body.title;
      entry.entry = req.body.entry;

      entry
        .save()
        .then(entry => {
          res.json("Update complete");
        })
        .catch(err => {
          res.status(400).send("Unable to update the database, ", err);
        });
    }
  });
});

// Define delete (DELETE)
router.route("/delete/:id").get(function(req, res) {
  Journal.findByIdAndRemove({ _id: req.params.id }, function(err, entry) {
    if (err) {
      res.json(err);
    } else {
      res.json("Successfully Removed");
    }
  });
});

module.exports = router;
