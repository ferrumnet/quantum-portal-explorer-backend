'use strict';
var mongoose = require('mongoose');
var collectionName = 'quantumPortalFinalizedBlocks';

var schema = mongoose.Schema({
  blockNumber: { type: String, default: "" },
  status: { type: String, default: "" },
  timestamp: { type: Number, default: null },
  quantumPortalStandardBlocks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'quantumPortalStandardBlocks'}],
  finalizedBlockRewardInfo: { 
    amount: { type: Number, default: null },
    cabn: { type: String, default: "" },
  },
  accumulatedStandardBlockRewardInfo: { 
    amount: { type: Number, default: null },
    cabn: { type: String, default: "" },
  },
  createdAt: { type: Date, default: new Date() },
  updatedAt: { type: Date, default: new Date() },
},{ collection: collectionName });

var quantumPortalFinalizedBlocksModel = mongoose.model(collectionName,schema);
module.exports = quantumPortalFinalizedBlocksModel;
