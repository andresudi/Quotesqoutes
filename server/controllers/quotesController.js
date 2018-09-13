const Quote = require('../models/quotes');

const createQuote = (req, res) => {
    const { likes, status } = req.body
    let loggedInUser = req.loggedInUser
    Quote.create({
        likes: likes,
        status: status,
        user: loggedInUser._id,
    })
    .then((data) => {
        res.status(201).json({
            data
        })
    })
    .catch((err) => {
        res.status(400).json({
            message: err.message
        })
    })
}

const listAllQuote = (req, res) => {
    Quote.find({})
    .then((data) => {
        res.status(200).json({
            data
        })
    })
    .catch((err) => {
        res.status(400).json({
            message: err.message
        })
    })
}

const deleteQuote = (req, res) => {
    let loggedInUser = req.loggedInUser
    Quote.findOne({
        _id: req.params.id
    })
    .then((data) => {
        console.log('ini data', data);
        console.log(loggedInUser);
        if (data) {
            if(String(data.user) == String(loggedInUser._id)) {
                Quote.deleteOne({_id: req.params.id})
                .then(() => {
                    res.status(201).json({
                        "success": true,
                        "message": `Quote with id ${req.params.id} deleted`
                    })
                })
                .catch((err) => {
                    res.status(400).json({
                        message: err.message
                    })
                })
            } else {
                res.status(400).json({
                    message: `Only user with id ${loggedInUser._id} can delete this quote!`
                })
            }
        } else {
            res.status(400).json({
                message: `Data not found`
            })
        }
    })
    .catch((err) => {
        res.status(400).json({
            message: err.message
        })
    })
}

module.exports = {
    createQuote,
    listAllQuote,
    deleteQuote
};
