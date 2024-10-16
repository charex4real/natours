const User = require('./../model/userModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');

exports.getAllUsers = catchAsync(async (req, res, next) => {
  const users = await User.find();

  // SEND RESPONSE
  res.status(200).json({
    status: 'success',
    results: users.length,
    data: {
      users,
    },
  });
});

exports.createUser = (req, res) => {
  res.status(505).json({
    status: 'error',
    message: 'This route is not yet define!',
  });
};

exports.getUser = (req, res) => {
  res.status(505).json({
    status: 'error',
    message: 'This route is not yet define!',
  });
};

exports.updateUser = (req, res) => {
  res.status(505).json({
    status: 'error',
    message: 'This route is not yet define!',
  });
};

exports.deleteUser = (req, res) => {
  res.status(505).json({
    status: 'error',
    message: 'This route is not yet define!',
  });
};
exports.testUsers = (req, res) => {
  res.status(505).json({
    status: 'error',
    message: 'This route is not yet define!',
  });
};