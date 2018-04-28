const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const http = require('http');
const bodyParser = require('body-parser');
const errorhandler = require('errorhandler');
const path = require('path');
const passport = require('passport');

const config = require('./config');
const Admin = require('./models/admin');
const User = require('./models/user');
const Group = require('./models/group');
const routes = require('./routes');

const app = express();

app.set('port', config.get('port'));
mongoose.connect(config.get('mongoose:uri'),{
  useMongoClient: true
});
mongoose.Promise = global.Promise;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(passport.initialize());

const localSignupStrategy = require('./passport/local-signup');
passport.use('local-signup', localSignupStrategy);

const localLoginStrategy = require('./passport/local-login');
passport.use('local-login', localLoginStrategy);

const authCheckMiddleware = require('./middleware/auth-check');
app.use('/users', authCheckMiddleware);
app.use('/groups', authCheckMiddleware);

app.use('/auth', routes.authRoutes);
app.use('/users', routes.userRoutes);
app.use('/groups', routes.groupRoutes);
app.use((err, req, res, next) => {
  if (app.get('env') == 'development') {
  } else {
    res.sendStatus(500);
  }
});
app.listen(config.get('port'), () => {
  console.log('We are live on ' + config.get('port'));
});
