var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var jobSchema = new Schema({
   	position: String,
	company: String,
	location: String,
	summary: String,
	tag: String,
	hidden: Boolean,
	url: {type: String, unique: true},
});
module.exports = mongoose.model('Jobs', jobSchema);     


// const collection = 'jobs';
// 	const JobModel = mongoose.model('Job',{
// 	    position: String,
// 	    company: String,
// 	    location: String,
// 	    summary: String,
// 	    tag: String,
// 	    hidden: Boolean,
// 	    url: {type: String, unique: true},
// 	}, collection);