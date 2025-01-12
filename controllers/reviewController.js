const catchAsync = require('../utils/catchAsync');
const Review = require('./../model/reviewModel');


exports.getAllReviews =  catchAsync(async (req, res, next) => {
    
    let filter = {};
    if(req.params.tourId) filter = { tour: req.params.tourId };

    const review = await Review.find(filter);
    res.status(200).json({
        status:'success',
        results:review.length,
        data: {
            review,
        },
    });
})



exports.createReview =  catchAsync( async (req, res, next)=> {
    //allow nested routes
    if(!req.body.tour)  req.body.tour = req.params.tourId;
    if(!req.body.user) req.body.user = req.user.id;

    const newReview = await Review.create(req.body);
    res.status(201).json({
        status:'success',
        data: {
            newReview,
        },
    });
})