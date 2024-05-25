const express = require("express");
const router = express.Router({mergeParams : true});
const wrapAsync = require("../utils/wrapAsync.js");
const expressError = require("../utils/expressError.js");
const { listingSchema , reviewSchema} = require("../schema.js");
const Review = require("../models/review.js");
const Listing = require("../models/listing.js");

const reviewController = require("../controller/reviews.js")


const validateReview = (req , res, next) => {
    let {error} = reviewSchema.validate(req.body);
        if(error){
            let errMsg = error.details.map((el) => el.message).join(",");
            throw new expressError(400, errMsg);
        } else{
            next();
        }
};


//Post review route
router.post("/" , validateReview , wrapAsync(reviewController.createReview));

//Delete review Route

router.delete("/:reviewId" , wrapAsync(reviewController.deleteORdestroyReview));

module.exports = router;