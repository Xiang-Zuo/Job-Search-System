'use strict'
const mongoose = require('mongoose');
const JobModel = require('../helpers/JobModel.js')

module.exports = {
	DeleteJobById : DeleteJobById
}


function DeleteJobById(req,res) {
  let targetId = req.swagger.params.id.value
	mongoose.connect('mongodb://localhost/jobInfo',  { useNewUrlParser: true,  useUnifiedTopology: true });
  var query = { id: parseInt(targetId) };
  JobModel.deleteOne(query, function(err, response) {
    res.header('Content-Type', 'application/json');
    if (err) {
      console.log(err);
      res.statusCode = 409;
      res.end(JSON.stringify(err))
    } else {
      res.end(JSON.stringify(response));
      console.log(response);
    }
  });
}
