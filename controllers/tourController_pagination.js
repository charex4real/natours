//const express = require('express');

const Tour = require('./../model/tourModel');

// Middleware

exports.aliasTopTours = (req, res, next) => {
  req.query.limit = 5;
  req.query.sort = '-ratingsAverage,price';
  req.query.fields = 'name,price,ratingsAverage,sumary,difficulty';
  next();
};
// 2) ROUTE handler
//GET and POST
exports.getAlltours = async (req, res) => {
  try {
    //BUILD QUERY
    //1a) FILTERING
    const queryObj = { ...req.query };
    const excludedFields = ['page', 'sort', 'limit', 'fields'];
    excludedFields.forEach((el) => delete queryObj[el]);

    //1b) ADVANCE FILTERING

    let queryStr = JSON.stringify(queryObj);
    //we using regExp to convert gte to $gte etc
    // \b is because we want to match the exact word
    // g is beacuse we want it to happen multiple times
    //http://127.0.0.1:3000/api/v1/tours?duration[gte]=5&difficulty=easy&page=2&sort=1&limit=10&price[lt]=1500

    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
    //console.log(JSON.parse(queryStr));
    let query = Tour.find(JSON.parse(queryStr));
    console.log(req.query);
    //2)Sorting
    //http://127.0.0.1:3000/api/v1/tours?sort=price   this is sorting by default in ascending order

    //http://127.0.0.1:3000/api/v1/tours?sort=-price the -price allows it to be sorted in descending order
    if (req.query.sort) {
      //THE sortBy allo users o pspecify which table field you want..
      // the sort t0 be based on
      const sortBy = req.query.sort.split(',').join(' ');
      //console.log(sortBy);
      query = query.sort(req.query.sort);
    } else {
      query = query.sort('-createdAt');
    }

    //3 FIELD LIMITING
    if (req.query.fields) {
      const fields = req.query.fields.split(',').join(' ');
      //console.log(fields);
      query = query.select(fields);
    } else {
      query = query.select('-__v');
    }

    //4) Pagination
    //page=2limit=10, 1-10, page 1, 11-20, page 2, 21 30 page3
    const page = req.query.page * 1 || 1;
    // multiplying by one is to convert string to integer
    const limitValue = req.query.limit * 1 || 5;
    const skipValue = page;
    query = query.skip(skipValue).limit(limitValue);
    if (req.query.page) {
      const numTours = await Tour.countDocuments();
      if (skipValue >= numTours) throw new Error('This page dopes not exist');
    }

    //EXECUTE QUERY
    //const tours = await Tour.find(queryObj);
    //query = query.sort().skip().limit();
    const tours = await query;

    res.status(200).json({
      status: 'success',
      results: tours.length,
      data: {
        tours,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'Failed',
      message: err,
    });
  }
};

exports.createTour = async (req, res) => {
  // cons newTour = new Tour({});
  //newTour.save().then().catch()
  try {
    const newTour = await Tour.create(req.body);
    res.status(201).json({
      status: 'success',
      data: {
        newTour,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: 'Invalid data sent!',
    });
  }
};

exports.getTour = async (req, res) => {
  try {
    const tour = await Tour.findById(req.params.id);
    //Tour.findOne({_id: req.params.id});
    res.status(200).json({
      status: 'success',
      data: {
        tour,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.updateTour = async (req, res) => {
  try {
    const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({
      status: 'success',
      data: {
        tour,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};
exports.deleteTour = async (req, res) => {
  try {
    const tour = await Tour.findByIdAndDelete(req.params.id);
    res.status(202).json({
      status: 'success',
      data: {
        tour: null,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};
//const express = require('express');

const Tour = require('./../model/tourModel');

// Middleware

exports.aliasTopTours = (req, res, next) => {
  req.query.limit = 5;
  req.query.sort = '-ratingsAverage,price';
  req.query.fields = 'name,price,ratingsAverage,sumary,difficulty';
  next();
};
// 2) ROUTE handler
//GET and POST
exports.getAlltours = async (req, res) => {
  try {
    //BUILD QUERY
    //1a) FILTERING
    const queryObj = { ...req.query };
    const excludedFields = ['page', 'sort', 'limit', 'fields'];
    excludedFields.forEach((el) => delete queryObj[el]);

    //1b) ADVANCE FILTERING

    let queryStr = JSON.stringify(queryObj);
    //we using regExp to convert gte to $gte etc
    // \b is because we want to match the exact word
    // g is beacuse we want it to happen multiple times
    //http://127.0.0.1:3000/api/v1/tours?duration[gte]=5&difficulty=easy&page=2&sort=1&limit=10&price[lt]=1500

    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
    //console.log(JSON.parse(queryStr));
    let query = Tour.find(JSON.parse(queryStr));
    console.log(req.query);
    //2)Sorting
    //http://127.0.0.1:3000/api/v1/tours?sort=price   this is sorting by default in ascending order

    //http://127.0.0.1:3000/api/v1/tours?sort=-price the -price allows it to be sorted in descending order
    if (req.query.sort) {
      //THE sortBy allo users o pspecify which table field you want..
      // the sort t0 be based on
      const sortBy = req.query.sort.split(',').join(' ');
      //console.log(sortBy);
      query = query.sort(req.query.sort);
    } else {
      query = query.sort('-createdAt');
    }

    //3 FIELD LIMITING
    if (req.query.fields) {
      const fields = req.query.fields.split(',').join(' ');
      //console.log(fields);
      query = query.select(fields);
    } else {
      query = query.select('-__v');
    }

    //4) Pagination
    //page=2limit=10, 1-10, page 1, 11-20, page 2, 21 30 page3
    const page = req.query.page * 1 || 1;
    // multiplying by one is to convert string to integer
    const limitValue = req.query.limit * 1 || 5;
    const skipValue = page;
    query = query.skip(skipValue).limit(limitValue);
    if (req.query.page) {
      const numTours = await Tour.countDocuments();
      if (skipValue >= numTours) throw new Error('This page dopes not exist');
    }

    //EXECUTE QUERY
    //const tours = await Tour.find(queryObj);
    //query = query.sort().skip().limit();
    const tours = await query;

    res.status(200).json({
      status: 'success',
      results: tours.length,
      data: {
        tours,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'Failed',
      message: err,
    });
  }
};

exports.createTour = async (req, res) => {
  // cons newTour = new Tour({});
  //newTour.save().then().catch()
  try {
    const newTour = await Tour.create(req.body);
    res.status(201).json({
      status: 'success',
      data: {
        newTour,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: 'Invalid data sent!',
    });
  }
};

exports.getTour = async (req, res) => {
  try {
    const tour = await Tour.findById(req.params.id);
    //Tour.findOne({_id: req.params.id});
    res.status(200).json({
      status: 'success',
      data: {
        tour,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.updateTour = async (req, res) => {
  try {
    const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({
      status: 'success',
      data: {
        tour,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};
exports.deleteTour = async (req, res) => {
  try {
    const tour = await Tour.findByIdAndDelete(req.params.id);
    res.status(202).json({
      status: 'success',
      data: {
        tour: null,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};
