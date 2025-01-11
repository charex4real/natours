exports.deleteOne = Model =>catchAsync(async (req, res, next) => {
  const doc = await Model.findByIdAndDelete(req.params.id);

  if (!doc) {
    return next(new AppError('No tour found with that ID', 404));
  }
  res.status(202).json({
    status: 'success',
    data: {
      data: null,
    },
  });
});


exports.deleteTour = catchAsync(async (req, res, next) => {
  const tour = await Tour.findByIdAndDelete(req.params.id);

  if (!tour) {
    return next(new AppError('No tour found with that ID', 404));
  }
  res.status(202).json({
    status: 'success',
    data: {
      tour: null,
    },
  });
});