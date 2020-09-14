'use strict'
const mongoose = require('mongoose');
const JobModel = require('../helpers/JobModel.js')

module.exports = {
	GetAllJobs : GetAllJobs
}

function GetAllJobs(req,res) {
	mongoose.connect('mongodb://localhost/jobInfo',  { useNewUrlParser: true,  useUnifiedTopology: true });
  let docs = JobModel.find({}, function(err, result) {
    if (err) {
      console.log(err);
    } else {
    	res.header('Content-Type', 'application/json');
    	res.end(JSON.stringify(result));
      console.log(result);
    }
	})
}