const jwt = require('jsonwebtoken')
const bookModel = require("../Modules/BooksModel")


const isValidObjectId = function (objectId) {
    return mongoose.Types.ObjectId.isValid(objectId)
}



const authentication = function (req, res, next) {
    try {
        let token = req.headers["x-auth-token"]
        if (!token) {
            res.status(401).send({ status: false, msg: " token is required" })
        }

        let decodedToken = jwt.decode(token)
        if (!decodedToken) {
            return res.status(401).send({ status: false, msg: "token is invalid" })
        }
        let a = Math.floor(Date.now() / 1000)
        if (decodedToken.exp < a) {
            return res.status(401).send({ status: false, msg: "token is expired please login again" })
        }

        next()
    }
    catch (error) {
        console.log(error)
        res.status(500).send({ msg: error })
    }
}


let authorization = async function (req, res, next) {
    try {
        let bookId = req.params.bookId

        if (!isValidObjectId(bookId)) {
            res.status(400).send({ status: false, msg: " bookId is not a valid ObjectId" })
        }
        let token = req.headers["x-auth-token"]
        let decodedToken = jwt.verify(token, "room-46")
        let bookDetails = await bookModel.findOne({ _id: bookId })
        if (!bookDetails) {
            res.status(404).send({ status: false, msg: "id not found" })
        }
        if (decodedToken.userId != bookDetails.userId) {
            return res.status(403).send({ status: false, msg: "you are not authorized" })
        }
        next()
    }
    catch (error) {
        console.log(error)
        res.status(500).send({ msg: error })
    }
}


module.exports.authentication = authentication
module.exports.authorization = authorization