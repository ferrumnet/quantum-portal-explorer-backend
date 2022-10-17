'use strict';
var mongoose = require('mongoose');
var collectionName = 'networks';

var schema = mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
  name: { type: String, default: "" },
  nameInLower: { type: String, default: ""},
  networkShortName: { type: String, default: "" },
  ferrumNetworkIdentifier: { type: String, default: "" },
  chainId: { type: String, default: "" },
  networkId: { type: String, default: "" },
  rpcUrl: { type: String, default: "" },
  blockExplorerUrl: { type: String, default: "" },
  networkCurrencySymbol: { type: String, default: "" },
  dexInputCurrencySymbolList: [],
  isTestnet: { type: Boolean, default: false },
  parentId: { type: mongoose.Schema.Types.ObjectId, ref: 'networks' },
  isActive: { type: Boolean, default: true },
  logo: { type: String, default: "" },
  contractAddress: { type: String, default: "" },
  publicRpcUrl: { type: String, default: "" },
  backupRpcUrl: { type: String, default: "" },

  createdAt: { type: Date, default: new Date() },
  updatedAt: { type: Date, default: new Date() },
},{ collection: collectionName });

var networksModel = mongoose.model(collectionName,schema);
module.exports = networksModel;
