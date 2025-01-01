const express = require('express');
const fs = require('fs');
const morgan = require('morgan');
const app = express();

// 1)MIDDLESWARES

app.use(morgan('dev'));
app.use(express.json());

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
 // console.log('hello from the Middleware');
  next();
});

//GETTING THE JSON FILE
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

// 2) ROUTE handler
//GET and POST

const getAlltours = (req, res) => {
  res.status(200).json({
    status: 'success',
    requestedAt: req.requestTime,
    results: tours.length,
    data: {
      tours,
    },
  });
};

const createTour = (req, res) => {
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
      }
    );
};

const seleteTourById = (req, res) => {
  const id = req.params.id * 1;
  const tour = tours.find((el) => el.id === id);
  if (!tour) {
    res.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    });
  } else {
    res.status(200).json({
      status: 'success',
      data: {
        tour,
      },
    });
  }
};

const updateTour = (req, res) => {
  const tourId = req.params.id * 1;
  if (tourId > tours.length) {
    res.status(404).json({
      status: 'fail',
      data: {
        tour: '<Invalid ID>',
      },
    });
  }
  res.status(200).json({
    status: 'success',
    data: {
      tour: '<Updated tour here...>',
    },
  });
};

const deleteTour = (req, res) => {
  const tourId = req.params.id * 1;
  if (tourId > tours.length) {
    res.status(404).json({
      status: 'fail',
      data: {
        tour: '<Invalid ID>',
      },
    });
  }

  res.status(202).json({
    status: 'success',
    data: null,
  });
};

const getAllUser = (req, res) => {
  res.status(505).json({
    status: 'error',
    message: 'This route is not yet define!',
  });
};

const createUser = (req, res) => {
  res.status(505).json({
    status: 'error',
    message: 'This route is not yet define!',
  });
};

const getUser = (req, res) => {
  res.status(505).json({
    status: 'error',
    message: 'This route is not yet define!',
  });
};

const updateUser = (req, res) => {
  res.status(505).json({
    status: 'error',
    message: 'This route is not yet define!',
  });
};

const deleteUser = (req, res) => {
  res.status(505).json({
    status: 'error',
    message: 'This route is not yet define!',
  });
};

// 3) ROUTES
const tourRouter = express.Router();
const userRouter = express.Router();

tourRouter.route('/').get(getAlltours).post(createTour);
//
//GET BY ID  ROUTE
//update tour
//delete tour
//.route('/api/v2/tours/:id')

tourRouter
  .route('/:id')
  .get(seleteTourById)
  .patch(updateTour)
  .delete(deleteTour);

userRouter.route('/').get(getAllUser).post(createUser);
userRouter.route('/:id').get(getUser).patch(updateUser).delete(deleteUser);

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);


// 4) START SERVER
const port = 3000;
app.listen(port, () => {
  console.log(`App running on ${port} ...`);
}); 

//const
