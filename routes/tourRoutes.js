const express = require('express');
const tourController = require('./../controllers/tourController');

const router = express.Router();

// 3) ROUTES
//NB the val is what is use to get the value of the 'id'
//router.param('id', tourController.checkID);
router
  .route('/top-5-cheap')
  .get(tourController.aliasTopTours, tourController.getAlltours);

router.route('/tour-stats').get(tourController.getTourStats);
router.route('/monthly-plan/:year').get(tourController.getMonthlyPlan);

router
  .route('/')
  .get(tourController.getAlltours)
  .post(tourController.createTour);
//
//GET BY ID  ROUTE
//update tour
//delete tour
//.route('/api/v2/tours/:id')

router
  .route('/:id')
  .get(tourController.getTour)
  .patch(tourController.updateTour)
  .delete(tourController.deleteTour);

module.exports = router;
