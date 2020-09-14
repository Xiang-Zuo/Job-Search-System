'use strict'
const mongoose = require('mongoose');
const JobModel = require('../helpers/JobModel.js')

module.exports = {
	UpdateJobById : UpdateJobById
}


function UpdateJobById(req,res) {
  //console.log("aaaab")
  let targetId = req.swagger.params.id.value
	mongoose.connect('mongodb://localhost/jobInfo',  { useNewUrlParser: true,  useUnifiedTopology: true });

  var query = { id: parseInt(targetId) };
  var newInfo = req.swagger.params.updated_job.value

  var newJobInfo = {
    position: newInfo.job_position,
    company: newInfo.job_company,
    location: newInfo.job_location,
    summary: newInfo.job_summary,
    tag: newInfo.job_tag,
    hidden: newInfo.job_hidden
  }


  JobModel.updateOne(query, newJobInfo, function(err, result) {
    res.header('Content-Type', 'application/json');
    if (err) {
      console.log(err);
      res.statusCode = 400;
      res.end(JSON.stringify(err))
    } else {
      // console.log("succ")
      // console.log(result);
      res.end(JSON.stringify({"status":200,"message":"updated successfully"}));
      
    }
  });
}
