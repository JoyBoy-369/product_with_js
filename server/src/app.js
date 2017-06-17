import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import morgan from 'morgan';
import passport from 'passport';

import {logger} from './util';
import {auth as authConfig} from '../config';
import setupAuthRoutes from './auth';

const app = express();

app.use(morgan('combined', {
  stream: logger.stream,
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true,
}));

app.use(cookieParser());

app.use(session({
  secret: authConfig.secret,
  resave: false,
  saveUninitialized: true,
  cookie: {secure: true},
}));

app.use(passport.initialize());
app.use(passport.session());

app.get('/', (req, res) => {
  res.send('Hello World');
});

setupAuthRoutes(app);

app.use((err, req, res) => {
  logger.error(err.stack);
  res.status(500).send(err);
});

export default app;
