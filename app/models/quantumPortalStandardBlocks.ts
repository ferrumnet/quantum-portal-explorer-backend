'use strict';
var mongoose = require('mongoose');
var collectionName = 'quantumPortalStandardBlocks';

var schema = mongoose.Schema({
  blockNumber: { type: String, default: "" },
  status: { type: String, default: "" },
  finalizedBlockNumberInfo: { 
    status: { type: String, default: "" },
    blockNumber: { type: String, default: "" },
  },
  timestamp: { type: Number, default: null },
  quantumPortalTransactions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'quantumPortalTransactions'}],
  blockRewardInfo: { 
    amount: { type: Number, default: null },
    cabn: { type: String, default: "" },
  },
  createdAt: { type: Date, default: new Date() },
  updatedAt: { type: Date, default: new Date() },
},{ collection: collectionName });

var quantumPortalStandardBlocksModel = mongoose.model(collectionName,schema);
module.exports = quantumPortalStandardBlocksModel;
