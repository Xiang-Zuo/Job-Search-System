'use strict'
const mongoose = require('mongoose');
const JobModel = require('../helpers/JobModel.js')

module.exports = {
	GetJobsByKeyword : GetJobsByKeyword
}

function GetJobsByKeyword(req,res) {
  const keyword = req.swagger.params.keyword.value;
  //console.log(keyword)
	mongoose.connect('mongodb://localhost/jobInfo',  { useNewUrlParser: true,  useUnifiedTopology: true });
  let docs = JobModel.find({}, function(err, result) {
    //console.log(typeof(result))
    var count = Object.keys(result).length;
    //console.log(count);
    let jobs = []
    for (var i = 0; i < count; i++){
      if (result[i].position.toUpperCase().includes(keyword.toUpperCase())){
        //console.log(result[i].position)
        jobs.push(result[i])
      }
      //
      //console.log(data[i])
    }
    res.header('Content-Type', 'application/json');
    if (err) {
      console.log(err);
      res.statusCode = 400;
      res.end(JSON.stringify(result));
    } else {
      res.end(JSON.stringify(jobs));
      console.log(jobs);
    }
})
}
