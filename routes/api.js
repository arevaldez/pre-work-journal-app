const express = require("express");
const router = express.Router();
const Journal = require("../models/journal");

router.get("/entries", (req, res, next) => {
  //this will return all the data, exposing only the id and action field to the client
  Journal.find({}, "action")
    .then(data => res.json(data))
    .catch(next);
});

router.post("/journal", (req, res, next) => {
  if (req.body.action) {
    Journal.create(req.body)
      .then(data => res.json(data))
      .catch(next);
  } else {
    res.json({
      error: "The input field is empty"
    });
  }
});

router.delete("/journal/:id", (req, res, next) => {
  Journal.findOneAndDelete({ _id: req.params.id })
    .then(data => res.json(data))
    .catch(next);
});

module.exports = router;
