const express = require('express');
const morgan = require('morgan');
//const fs = require('fs');

const app = express();
const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');
const tourRouter = require('./routes/tourRoutes');
const usersRouter = require('./routes/userRoutes');

// 1)MIDDLESWARES
//console.log(process.env.NODE_ENV);
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json());
app.use(express.static(`${__dirname}/public`));

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  //console.log(req.headers);
  next();
});

// 3) ROUTES
//Mounting our Router
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', usersRouter);
app.all('*', (req, res, next) => {
  //1) stage
  // res.status(404).json({
  //   status: 'fail',
  //   message: `Can't find ${req.originalUrl} on this server`,
  // });
  //2) second stage
  // const err = new Error(`Can't find ${req.originalUrl} on this server`);
  // err.statusCode = 404;
  // next(err); // it will skip all middleware on the stack and move to the erro handling middleware.
  //3) third stagen
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});

// 4) ERROR HANDLING

app.use(globalErrorHandler);
// const accessLogStream = fs.createWriteStream(
module.exports = app;
