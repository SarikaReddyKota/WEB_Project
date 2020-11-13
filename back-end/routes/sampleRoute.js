const express = require('express');
const sampleModel = require('../models/sampleModel.js');
const app = express();

app.get('/test', async (req, res) => {
  const result = await sampleModel.find({});

  try {
    res.send(result);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.post('/check', async (req, res) => {
    //console.log('Hitting here.....', req.body);
    let user = {
        firstname: req.body.firstname,
        lastname: req.body.lastname
    }

    var data = new sampleModel(user);
    data.save();
    // const result = await sampleModel.find({});
  
    // try {
      //res.send(res);
      res.json(res);
    // } catch (err) {
    //   res.status(500).send(err);
    // }
  });

module.exports = app