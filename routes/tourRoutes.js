const express = require('express');
//const fs = require('fs');
const tourController = require('./../controllers/tourController'); 

const router = express.Router();

router
  .route('/')
  .get(tourController.getAllTours)
  .post(tourController.newTour);

router
  .route('/:id')
  .patch(tourController.updateTour)
  .delete(tourController.deleteTour)
  .get(tourController.getTour);

module.exports = router;
