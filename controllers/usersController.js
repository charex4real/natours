const User = require('./../model/userModel');
const catchAsync = require('./../utils/catchAsync');
//const AppError = require('./../utils/appError');

const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};

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

exports.updateMe = catchAsync(async (req, res, next) => {
  // 1) Create error if user POSTs password data
  if (req.body.password || req.body.passwordConfirm) {
    return next(
      new AppError(
        'This route is not for password updates. Please use /updateMyPassword.',
        400,
      ),
    );
  }

  // 2) Filtered out unwanted fields names that are not allowed to be updated
  const filteredBody = filterObj(req.body, 'name', 'email');

  // 3) Update user document
  const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    status: 'success',
    data: {
      user: updatedUser,
    },
  });
});

exports.deleteMe = catchAsync(async (req, res, next) => {
  await User.findByIdAndUpdate(req.user.id, { active: false });

  res.status(204).json({
    status: 'success',
    data: null,
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
