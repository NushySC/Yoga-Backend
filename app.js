const express = require('express');
const fs = require('fs');

const app = express();

// app.get('/', (req, res) => {
//   res
//     .status(200)
//     .json({ message: 'Hello from the server side', app: 'Yogatours' });
// });

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

//especify version
app.get('/api/v1/tours', (req, res) => {
  res.status(200).json({
    status: 'Success',
    results: tours.length,
    //number ot items if an array
    data: {
      tours: tours
      //same as constant
    }
  });
});

app.post('/', (req, res) => {
  res.send('You can post here');
});

const port = 3000;
app.listen(port, () => {
  console.log(`App started on port ${port}`);
});
