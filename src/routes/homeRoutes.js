const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const mongoose = require('mongoose');
const homeRouter = express.Router();
const path = require('path');
const sql = require('mssql');
const debug = require('debug')('app:homeRoutes');

app.use(express.static(path.join(__dirname, '/public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

var dbUrl = 'mongodb+srv://user:user@plushealth-iizho.mongodb.net/plushealth?ssl=true&authSource=admin'

var Message = mongoose.model('Message', {
  name: String,
  message: String
});

homeRouter.route('/')
  .get((req, res) => {
    (async function query() {
      const request = new sql.Request();

      const result = await request.query('select * from messages');
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
          messages: result.recordset
        });
    }())
  });

homeRouter.route('/messages')
  .get((req, res) => {
    Message.find({}, (err, messages) => {
      res.send(messages);
    });
  });

homeRouter.route('/messages')
  .post((req, res) => {
    var message = new Message(req.body);

    message.save()
      .then(item => {
        console.log("item saved to database");

        io.emit('message', req.body);
        res.sendStatus(200);

      })
      .catch(err => {
        sendStatus(500);
      });
  });

mongoose.connect(dbUrl, { useNewUrlParser: true }, function (err, db) {
  console.log('mongo db connection', err);
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

module.exports = homeRouter;