'use strict';
var mongoose = require('mongoose');
var collectionName = 'quantumPortalTransactions';

var schema = mongoose.Schema({
  quantumPortalTransactionInfo: {
    transactionHash: { type: String, default: "" },
    network: { type: mongoose.Schema.Types.ObjectId, ref: 'networks' },
    status: { type: String, default: "" },
    blockInfo: { 
      standardBlockNumber: { type: String, default: "" },
      finalizedBlockNumber: { type: String, default: "" },
      standardTimestamp: { type: Number, default: null },
      finalizedTimestamp: { type: Number, default: null },
    },
    remoteContract: { type: String, default: "" },
    transactionFee: { type: String, default: "" },
    positionInBlock: { type: String, default: "" },
    nonce: { type: String, default: "" },
  },
  sourceTransactionInfo: {
    transactionHash: { type: String, default: "" },
    address: { type: String, default: "" },
    network: { type: mongoose.Schema.Types.ObjectId, ref: 'networks' },
    status: { type: String, default: "" },
    timestamp: { type: Number, default: null },
    blockInfo: { 
      standardBlockNumber: { type: String, default: "" },
      finalizedBlockNumber: { type: String, default: "" },
    },
    remoteContract: { type: String, default: "" },
    quantumPortalContract: { type: String, default: "" },
    transactionFee: { type: String, default: "" },
    positionInBlock: { type: String, default: "" },
    nonce: { type: String, default: "" },
  },
  destinationTransactionInfo: {
    transactionHash: { type: String, default: "" },
    network: { type: mongoose.Schema.Types.ObjectId, ref: 'networks' },
    status: { type: String, default: "" },
    timestamp: { type: Number, default: null },
    blockInfo: { 
      standardBlockNumber: { type: String, default: "" },
      finalizedBlockNumber: { type: String, default: "" },
    },
    remoteContract: { type: String, default: "" },
    quantumPortalContract: { type: String, default: "" },
    transactionFee: { type: String, default: "" },
    positionInBlock: { type: String, default: "" },
    nonce: { type: String, default: "" },
  },
  tokensTransferred: [
    {
      source:{
        address: { type: String, default: "" },
        network: { type: mongoose.Schema.Types.ObjectId, ref: 'networks' },
      },
      destination:{
        address: { type: String, default: "" },
        network: { type: mongoose.Schema.Types.ObjectId, ref: 'networks' },
      },
      for:{
        tokenAddress: { type: String, default: "" },
        amount: { type: Number, default: "" },
        network: { type: mongoose.Schema.Types.ObjectId, ref: 'networks' },
      }
    }
  ],
  inputData: { type: String, default: "" },
  createdAt: { type: Date, default: new Date() },
  updatedAt: { type: Date, default: new Date() },
},{ collection: collectionName });

var quantumPortalTransactionsModel = mongoose.model(collectionName,schema);
module.exports = quantumPortalTransactionsModel;
