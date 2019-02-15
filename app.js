const express = require('express');
const bodyParser = require('body-parser');
const chalk = require('chalk');
const debug = require('debug')('app');
const morgan = require('morgan');
const path = require('path');
const sql = require('mssql');

const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const port = process.env.PORT || 3000;

const config = {
  user: 'plushealth',
  password: 'rumeyrumey!1',
  server: 'plushealth.database.windows.net', // You can use 'localhost\\instance' to connect to named instance
  database: 'PlusHealth',

  options: {
      encrypt: true // Use this if you're on Windows Azure
  }
};
sql.connect(config).catch(err =>{
  debug(err);
});
app.use(morgan('tiny'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, '/public')));
app.use('/css', express.static(path.join(__dirname, '/node_module/bootstrap/dist/css')));
app.use('/js', express.static(path.join(__dirname, '/node_module/bootstrap/dist/js')));
app.use('/js', express.static(path.join(__dirname, '/node_module/jquery/dist')));
app.set('views', './src/views');
app.set('view engine', 'ejs');

const homeRouter = require('./src/routes/homeRoutes');
const authRouter = require('./src/routes/authRoutes');


app.use('/home', homeRouter);
app.use('/auth', authRouter);

app.get('/', (req, res) => {
  res.render(
    'index',
    {
      nav: [{ link: '#about', title: 'ABOUT' },
        { link: '#symptomtracker', title: 'SYMPTOMTRACKER' },
        { link: '#contact', title: 'CONTACT' }],
      title: 'Plus Health'
    }
  );
});

io.on('connection', (socket) => {
  console.log('a user connected to our server');
}); 

var server = http.listen(port, () => {
  debug(`listening on port ${chalk.green(port)}`);
});
