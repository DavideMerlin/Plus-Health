const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const http = require('http').Server(app);
const homeRouter = express.Router();
const path = require('path');
const debug = require('debug')('app:homeRoutes');
const { MongoClient } = require('mongodb');

app.use(express.static(path.join(__dirname, '/public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

function router() {
  homeRouter.use((req, res, next) => {
    if (req.user) {
      next();
    } else {
      res.redirect('/');
    }
  });
  homeRouter.route('/')
    .get((req, res) => {
      const url = 'mongodb://localhost:27017';
      const dbName = 'plushealth';

      (async function mongo() {
        let client;
        try {
          client = await MongoClient.connect(url);
          debug('Connected to local Mongo');
          const db = client.db(dbName);
          const col = await db.collection('messages');
          const messages = await col.find().toArray();
          res.render('home',
            {
              nav: [{ link: '#developerChat', title: 'DeveloperChat' },
              { link: '#health', title: 'Health' },
              { link: '/home/symptomtracker', title: 'Symptoms Tracker' },
              { link: '/home/medications', title: 'Medications' },
              { link: '/home/doctors', title: 'Doctors' },
              { link: '/home/pharmacy', title: 'Pharmacies' },
              { link: '#contact', title: 'Contact' }],
              title: 'Plus Health Home',
              messages
            });
        } catch (err) {
          debug(err.stack);
        }
        client.close();
      }());
    });
  homeRouter.get('/', function (req, res, next) {
    res.render('index', { title: 'Express' });
  });

  homeRouter.route('/symptomtracker')
    .get((req, res) => {
      res.render('homesymptomtracker',
        {
          nav: [{ link: '#Symtoms', title: 'Symptoms' },
          { link: '#Result', title: 'Result' },
          { link: '#Medication', title: 'Medication' },
          { link: '#Doctor', title: 'Doctor' },
          { link: '#Pharmacy', title: 'Pharmacy' }],
          title: 'Plus Health Symptoms Tracker'
        });
    });
  homeRouter.route('/medications')
    .get((req, res) => {
      res.render('homemedication',
        {
          nav: [{ link: '#Medications', title: 'Plus Health Medications' },
          { link: '#Alternative', title: 'Alternative' },
          { link: '#Effect', title: 'Effect' },
          { link: '#Consumption', title: 'Consumption' },
          { link: '#Relatedfeatures', title: 'Related Features' }],
          title: 'Plus Health Medication'
        });
    });
  homeRouter.route('/doctors')
    .get((req, res) => {
      res.render('homedocter',
        {
          nav: [{ link: '#doctorslist', title: 'List of Doctor' },
          { link: '#recommended', title: 'Recommended Doctors' },
          { link: '#specialty', title: 'Specialty' },
          { link: '#location', title: 'Location' },
          { link: '#Appointment', title: 'Appointment' }],
          title: 'Plus Health Doctors'
        });
    });
  homeRouter.route('/pharmacy')
    .get((req, res) => {
      res.render('homepharmacy',
        {
          nav: [{ link: '#pharmacies', title: 'Pharmacies' },
          { link: '#recommended', title: 'Recommended Pharmacies' },
          { link: '#specialty', title: 'Specialty' },
          { link: '#location', title: 'Location' },
          { link: '#order', title: 'Send an Order' },
          { link: '#appointment', title: 'Appointment' }],
          title: 'Plus Health Pharmacies'
        });
    });
  homeRouter.route('/summary')
    .get((req, res) => {
      res.render('homesummary',
        {
          nav: [{ link: '#status', title: 'ealth Status' },
          { link: '#log', title: 'Symptoms Logs' },
          { link: '#chart', title: 'Health Chart' },
          { link: '#recommended', title: 'Recommendation' },
          { link: '#appointment', title: 'Appointment' }],
          title: 'Plus Health Summaries'
        });
    });
  return homeRouter;
}


module.exports = router;
