//const express = require('express');
const fs = require('fs');

//GETTING THE JSON FILE
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`),
);
exports.checkID = (req, res, next, val) => {
  console.log(`Tour id is ${val}`);
  const tourId = req.params.id * 1;
  if (tourId > tours.length) {
    return res.status(404).json({
      status: 'fail',
      Message: '<Invalid ID>',
    });
  }
  next();
};

exports.checkBody = (req, res, next) => {
  if (!req.body.name || !req.body.price) {
    return res.status(404).json({
      status: 'fail',
      message: 'Missing name or price',
    });
  }

  next();
};
// 2) ROUTE handler
//GET and POST
exports.getAlltours = (req, res) => {
  res.status(200).json({
    status: 'success',
    requestedAt: req.requestTime,
    results: tours.length,
    data: {
      tours,
    },
  });
};

exports.createTour = (req, res) => {
  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);
  //console.log(newTour);
  tours.push(newTour),
    fs.writeFile(
      `${__dirname}/dev-data/data/tours-simple.json`,
      JSON.stringify(tours),
      (err) => {
        res.status(201).json({
          status: 'success',
          data: {
            tours,
          },
        });
      },
    );
};

exports.seleteTourById = (req, res) => {
  const id = req.params.id * 1;
  const tour = tours.find((el) => el.id === id);

  res.status(200).json({
    status: 'success',
    data: {
      tour,
    },
  });
};

exports.updateTour = (req, res) => {
  const tourId = req.params.id * 1;

  res.status(200).json({
    status: 'success',
    data: {
      tour: '<Updated tour here...>',
    },
  });
};

exports.deleteTour = (req, res) => {
  res.status(202).json({
    status: 'success',
    data: null,
  });
};
