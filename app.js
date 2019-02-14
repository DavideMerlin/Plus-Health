const express = require('express');
const chalk = require('chalk');
const debug = require('debug')('app');
const morgan = require('morgan');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

app.use(morgan('tiny'));
app.use(express.static(path.join(__dirname, '/public')));
app.use('/css', express.static(path.join(__dirname, '/node_module/bootstrap/dist/css')));
app.use('/js', express.static(path.join(__dirname, '/node_module/bootstrap/dist/js')));
app.use('/js', express.static(path.join(__dirname, '/node_module/jquery/dist')));
app.set('views', './src/views');
app.set('view engine', 'ejs');

const homeRouter = require('./src/routes/homeRoutes');
app.use('/home', homeRouter);

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

app.listen(port, () => {
  debug(`listening on port ${chalk.green(port)}`);
});
