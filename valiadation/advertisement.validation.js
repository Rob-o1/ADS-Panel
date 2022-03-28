const { check, validationResult, body }= require('express-validator');
const AppSchema = require("../models/apps.model");
const PlaceSchema = require("../models/advertisementsPlaces.model");
const AdvertisementSchema = require("../models/advertisements.model");
const AdvertisementService = require("../services/advertisements.service");
const validator = require("validator");

exports.advertisementValidation = [
    check("rank")
    .not()
    .isEmpty()
    .withMessage("Rank is required!!"),
    check("brand_name")
    .not()
    .isEmpty()
    .withMessage("brand_name is required!!"),
    check('start_date_time').isISO8601().toDate()
    .not()
    .isEmpty()
    .withMessage("start_date_time can't be empty !"),
    check('end_date_time').isISO8601().toDate()
    .not()
    .isEmpty()
    .withMessage("end_date_time can't be empty !")
    .custom(async(value, {req}) => {
       if(value !=null){
           let startDate = req.body.start_date_time;
               if(startDate >= value)
               throw new Error("Start Date must be less than End Date");
       }
    }),
    check("app_id")
    .not()
    .isEmpty()
    .withMessage("App Id is required!!")
    .custom(async (value) => {
       if(value !=null){
            const getApp = await AppSchema.findById({ _id: value});
            if (getApp === null) {
                throw new Error("App Id Doesn't Exist");
            }
       }
    }),
    check("place_id")
    .not()
    .isEmpty()
    .withMessage("Place Id is required!!")
    .custom(async (value) => {
        if(value !=null){
            const getPlace = await PlaceSchema.findById({ _id: value });
             if (getPlace === null) {
                 throw new Error("Place Id Doesn't Exist");
             }
        }
     }),
     check("ad_click_url")
     .not()
     .isEmpty()
     .withMessage("URL can't be empty !")
     .custom(async(value) => {
        if(value !=null){
            if(!validator.isURL(value, { protocols: ['http','https','ftp'], require_tld: true, require_protocol: true })){
                throw new Error("Must be a Valid URL")}
        }
     }),
     check("is_partial_payment")
     .not()
     .isEmpty()
     .withMessage("is_partial_payment field is required")
     .custom(async(value) => {
        if(value !=null){
            if(value != 'true' && value != 'false'){
                throw new Error("You can select only true or false");
            }
        }
     }),
     check("status")
     .not()
     .isEmpty()
     .withMessage("status field is required")
     .custom(async(value) => {
        if(value !=null){
            if(value != 'active' && value != 'inactive' && value != 'draft' && value != 'deleted'){
                throw new Error("Invalid status");
            }   
        }
     }),
    check("poster_type")
    .not()
    .isEmpty()
    .withMessage("Poster type is required!!")
    .custom(async (value) => {
        if(value !=null){
            if(value != 'image' && value != 'video'){
                throw new Error("You can select only image or video type");
            }
        }
    }), 
   async (req, res, next) => {
        let startDate = new Date(req.body.start_date_time);
        let query = { place_id: req.body.place_id, rank: req.body.rank, app_id: req.body.app_id,end_date_time: {"$gte": startDate}};

		let queryResult = await AdvertisementService.getActiveAdvertisementsByQuery(query);
        if (queryResult.length > 0) {
            return res.status(400).json({ success: false, error: "Validator Error", message: [{
                "value": "",
                "msg": "Already exists",
                "param": "",
                "location": "body"
            }] });
        }

        const errors = validationResult(req);
 
        // If some error occurs, then this
        // block of code will run
        if (!errors.isEmpty()) {
         
           return res.status(400).json({ success: false, error: "Validator Error", message: errors.array() });
        }
        next();
    },
];

