const reviewModel = require('../Modules/ReviewModel')
const mongoose = require('mongoose')
const bookModel = require('../Modules/BooksModel')
const ReviewModel = require('../Modules/ReviewModel')
const ObjectId = mongoose.Types.ObjectId

const isvalid = function (value) {
    if (typeof value === 'undefined' || value === null) return false
    if (typeof value === 'string' && value.trim().length ===0 ) return false
    return true;
}

const isValidObjectId = function (ObjectId) {
    return mongoose.Types.ObjectId.isValid(ObjectId)
}

const createReview = async function(req, res){
    let data = req.body
     
    try{
        let reviewCreated= await ReviewModel.create(data)
        

    }
    catch{

    }
}