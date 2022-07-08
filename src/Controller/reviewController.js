const ReviewModel = require("../models/ReviewModel");
const BookModel = require("../models/BooksModel")


async function createReview(req, res) {
    try {
        let bookId = req.params.bookId; //params req
        if (!bookId) { //validation
            return res
                .status(400)
                .send({ status: false, message: "please provide bookid" }); //response
        }
        let checkBookId = await BookModel.findById(bookId); //findin db for id  which is given in req.param
        if (!checkBookId) {
            return res.status(400).send({ status: false, message: "No such bookId" }); //response
        }
        let data = req.body; //body req
        let { review, rating, reviewedBy, reviewedAt } = data; //destructure
        if (Object.keys(data).length == 0) { //key validation
            return res.status(400).send({
                status: false,
                message: "please provide data in request body", //measssage
            });
        }
        if (!reviewedBy) { //reviewBy  validation
            return res.status(400).send({
                status: false,
                message: "please provide review's name is required",
            });
        }
        if (!reviewedAt) { //reviewdAt validation
            return res.status(400).send({
                status: false,
                message: "please provide reviewedAt is required",
            });
        }
        if (!rating) { //rarting validadtion
            return res
                .status(400)
                .send({ status: false, message: "please provide rating" });
        }
        if (rating > 6 || rating < 0) { //rating must be between 1 to 5 beause it consider as between the rating
            return res
                .status(400)
                .send({ status: false, message: "give rating 1 t0 5 " }); //response
        }


        if (checkBookId.isDeleted == true) { //if the user can find the data which is already deleted i.e "is deleted is true"the this error will show
            return res.status(400).send({ status: false, message: "Already book deleted then you can not add" }); //response
        }

        let reviewData = await ReviewModel.create(data); //create database store in variable 
        if (reviewData) {
            await BookModel.findOneAndUpdate({ _id: bookId }, { $inc: { reviews: 1 } }); //this is for making increment in reviewe by 1
        }
        let RD = await ReviewModel.findOne({ _id: reviewData._id }).select({ _v: 0, createdAt: 0, updatedAt: 0, isDeleted: 0 }); //this can hide 
        res.status(201).send({ status: true, message: "review added", data: RD }); //show response
    } catch (err) {
        return res.status(500).send({ status: false, message: err.message });
    }
}
  module.exports={createReview}


// const reviewModel = require('../Modules/ReviewModel')
// const mongoose = require('mongoose')
// const bookModel = require('../Modules/BooksModel')
// const ReviewModel = require('../Modules/ReviewModel')
// const ObjectId = mongoose.Types.ObjectId

// const isvalid = function (value) {
//     if (typeof value === 'undefined' || value === null) return false
//     if (typeof value === 'string' && value.trim().length ===0 ) return false
//     return true;
// }

// const isValidObjectId = function (ObjectId) {
//     return mongoose.Types.ObjectId.isValid(ObjectId)
// }

// const createReview = async function(req, res){
//     let data = req.body
     
//     try{
//         let reviewCreated= await ReviewModel.create(data)
//         let 
        

//     }
//     catch{

//     }
// }
