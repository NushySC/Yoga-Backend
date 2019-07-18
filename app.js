const express = require('express');
const fs = require('fs');

const app = express();

//middleware
app.use(express.json());

app.use((req, res, next) => {
  console.log('Hello from the middleware 😁 ');
  next();
})

app.use ((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next()
})


// app.get('/', (req, res) => {
//   res
//     .status(200)
//     .json({ message: 'Hello from the server side', app: 'Yogatours' });
// });

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

const getAllTours = (req, res) => {
  console.log(req.requestTime)
  res.status(200).json({
    status: 'success',
    results: tours.length,
    requestedAt: req.requestTime,
    //number ot items if an array
    data: {
      tours: tours
      //same as constant
    }
  });
};

const getTour = (req, res) => {
  console.log(req.params);

  const id = req.params.id * 1;
  const tour = tours.find(el => el.id === id);

  //if (id > tours.length) {
  if (!tour) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID'
    });
  }

  res.status(200).json({
    status: 'Success',
    data: {
      tour: tour
    }
  });
};

const newTour = (req, res) => {
  //console.log(req.body);
  //res.send('Done');

  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);

  tours.push(newTour);
  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    err => {
      res.status(201).json({
        status: 'Success',
        data: {
          tour: newTour
        }
      });
    }
  );
};

const updateTour = (req, res) => {
  if (req.params.id * 1 > tours.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID'
    });
  }
  res.status(200).json({
    status: 'sucess',
    data: {
      tour: 'Updated tour here...'
    }
  });
};

const deleteTour = (req, res) => {
  if (req.params.id * 1 > tours.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID'
    });
  }
  res.status(204).json({
    status: 'sucess',
    data: null
  });
};
//especify version
//app.get('/api/v1/tours', getAllTours);

//app.get('/api/v1/tours/:id', getTour);

// app.post('/', (req, res) => {
//   res.send('You can post here');
// });

//app.post('/api/v1/tours', newTour);

//app.patch('/api/v1/tours/:id', updateTour);

//app.delete('/api/v1/tours/:id', deleteTour);

app
  .route('/api/v1/tours')
  .get(getAllTours)
  .post(newTour);

app
  .route('/api/v1/tours/:id')
  .patch(updateTour)
  .delete(deleteTour)
  .get(getTour);

const port = 3000;
app.listen(port, () => {
  console.log(`App started on port ${port}`);
});
