const request = require('request');
const cheerio = require('cheerio');
const mongoose = require('mongoose');

const collection = 'jobs';
const JobModel = mongoose.model('Job',{
    id: {type:Number,unique:true,dropDups: true},
    position: String,
    company: String,
    location: String,
    summary: String,
    tag: String,
    hidden: Boolean,
    url: String
}, collection);

const baseUrl = 'https://ca.indeed.com/jobs?q=web+developer&sort=date&limit=20&start=';

let count = 0;
let loops = 20;
let id = 0;

mongoose.connect('mongodb://localhost/jobInfo',  { useNewUrlParser: true,  useUnifiedTopology: true, useCreateIndex: true });
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'db connection error:'));
db.once('open', function() {
    console.log('db connect successfully');

    while (count <= 499) {
        let tempUrl = baseUrl + count;
        request(tempUrl, {json:false}, (err, res,body) => {
            if (err) {
                return console.log(err)
            }
            const $ = cheerio.load(body);
            let jobs = [];
            $('.jobsearch-SerpJobCard').each(function (index) {
                // console.log("cherrio...");
                let position = $(this).find('.title a').text().replace(/(\r\n|\n|\r)/gm, "");
                let company = $(this).find('.company').text().replace(/(\r\n|\n|\r)/gm, "");
                let location = $(this).find('.location').text().replace(/(\r\n|\n|\r)/gm, "");
                let summary = $(this).find('.summary').text().replace(/(\r\n|\n|\r)/gm, "");
                let url = $(this).find('.title a').attr('href').replace(/(\r\n|\n|\r)/gm, "");
                let job = new JobModel({
                    id: id,
                    position: position,
                    company: company,
                    location: location,
                    summary: summary,
                    tag: "",
                    hidden: false,
                    url: "https://ca.indeed.com" + url
                });
                jobs.push(job);
                id++;

            });
            db.collection('jobs').insertMany(jobs).then(res => {
                console.log("insert successfully")
            })
            .catch(err => {
                console.log(err);
            })
        });
        count += loops;
    }
});