const express = require('express');
const morgan = require('morgan');
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

const app = express();

//middleware

app.use(morgan('dev'));

app.use(express.json());

app.use((req, res, next) => {
  console.log('Hello from the middleware 😁 ');
  next();
});

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// app.get('/', (req, res) => {
//   res
//     .status(200)
//     .json({ message: 'Hello from the server side', app: 'Yogatours' });
// });

///route handlers

// to tour routes

//especify version
//app.get('/api/v1/tours', getAllTours);

//app.get('/api/v1/tours/:id', getTour);

// app.post('/', (req, res) => {
//   res.send('You can post here');
// });

//app.post('/api/v1/tours', newTour);

//app.patch('/api/v1/tours/:id', updateTour);

//app.delete('/api/v1/tours/:id', deleteTour);

///routes

//change app for tourRouter/userRouter
//this is called mounting router
// app.use
// .route('/api/v1/tours')
// .get(getAllTours)
// .post(newTour);

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

///server

module.exports = app;
