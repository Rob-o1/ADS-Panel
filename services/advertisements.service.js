// const mongoose = require('mongoose');
// const UserBonus = require('../models/UserBonus');
// const UserBonusLogs = require('../models/UserBonusLogs');


const AdvertisementSchema = require("../models/advertisements.model");


// exports.create = async (data) => {
//   return await Advertisements.create(data);
// }

exports.getActiveAdvertisementsByQuery = async (query) => {
  return await AdvertisementSchema.find(query);
} 





// exports.create = async (data) => {
//   return await UserBonus.create(data);
// }

// exports.getActiveAdvertisementsByQuery = async (query) => {
//     return await UserBonus.aggregate([
//         { $match: query }
//     ])
//   }

// exports.updateDebitedUserBonusDetails = async (bonuses) => {
//   let allBonuses = []
//   for (bonus of bonuses){
//     let updateDetails = {
//       'updateOne': {
//         'filter': { '_id': bonus._id},
//         'update': bonus,
//         'upsert': false
//       }
//     }
//     allBonuses.push(updateDetails);
//   }
//   return await UserBonus.bulkWrite(allBonuses);
// }

// exports.getSumOfAllActiveCashBonusesBasedOnQuery = async (query) => {
//   let totalBonus = await UserBonus.aggregate([
//     { $match: query },
//     {
//       $group: {
//         _id: null,
//         "total": {
//           "$sum": "$bonus_value"
//         }
//       }
//     }
//   ])
//   return (totalBonus.length == 0 ? 0 : totalBonus[0].total);
// }

// exports.getBonusList = async (query, page, size) => {
//     let skip = size * page;
//     let aggrPipeline = [
//         { $match: query },
//         { $skip: skip },
//         { $limit: size },
//         { $project: {
//             _id: 1, 
//             bonus_type: 1,
//             bonus_value: 1,
//             description: 1,
//             createdAt: 1
//         } }
//     ];
//     return await UserBonus.aggregate(aggrPipeline)
// }

// exports.getBonusCount = async (query) => {
//     let count = await UserBonus.aggregate([
//         { $match: query },
//         { $count: "count" }
//       ])
//     return (count.length == 0 ? 0 : count[0].count);
// }

// exports.findAndUpdateBonusToExpire = async (query) => {
// return await UserBonus.aggregate([
//       { $match: query },
    
//     ])
 
// }