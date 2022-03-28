const { check, validationResult, body }= require('express-validator');
const TransactionDetailSchema = require("../models/transactionDetails.model");
// const AdvertisementSchema = require("../models/advertisements.model");
// const AdvertisementService = require("../services/advertisements.service");
const validator = require("validator");


exports.transactionDetailValidation = [
    check("username")
    .not()
    .isEmpty()
    .withMessage("username is required!"),
    check("mobile")
    .not()
    .isEmpty()
    .withMessage("mobile is required!")
    .custom(async(value) => {
        if(value !=null){
            if(!validator.isMobilePhone(value)){throw new Error("Phone is invalid")}}
     }),
    check("email")
    .not()
    .isEmpty()
    .withMessage("email is required!")
    .custom(async(value) => {
       if(value !=null){
           if(!validator.isEmail(value)){throw new Error("Must be a Valid email")}}
    }),
    async (req, res, next) => {
        const errors = validationResult(req);
         // If some error occurs, then this
        // block of code will run
        if (!errors.isEmpty()) {
           return res.status(400).json({ success: false, error: "Validator Error", message: errors.array() });
        }
        next();
    },
];