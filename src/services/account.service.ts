import {
  QuantumPortalAccountModel,
  QuantumPortalRemoteTransactionModel,
  QuantumPortalContractObjectModel,
} from '../models';
import { ITransactionListResponse, QuantumPortalAccount } from '../interfaces';
import axios from 'axios';
import config from '../config/config';
// import ApiError from '../utils/ApiError';
// import httpStatus from 'http-status';

// export const accountTransactions = async (
//   page: number = 0,
//   limit: number = 10,
// ): Promise<ITransactionListResponse> => {
//   const docsPromise = QuantumPortalRemoteTransactionModel.find()
//     .sort({ timestamp: -1 })
//     .skip((page - 1) * limit)
//     .limit(limit);
//   const countPromise =
//     QuantumPortalRemoteTransactionModel.countDocuments().exec();

//   const [totalResults, results] = await Promise.all([
//     countPromise,
//     docsPromise,
//   ]);
//   const totalPages = Math.ceil(totalResults / limit);
//   const result = {
//     results,
//     page,
//     limit,
//     totalPages,
//     totalResults,
//   };
//   return result;
// };

export const getAccount = async (address: string): Promise<any> => {
  const rv = await QuantumPortalAccountModel.findOne({ address });
  if (!rv) {
    return {
      address: address.toLowerCase(),
      contract: {},
      isContract: false,
      contractObjects: {},
    };
  }
  const account = rv.toJSON() as QuantumPortalAccount;
  const contractObjects: any = {};
  if (account.isContract) {
    for (let network of Object.keys(account.contract)) {
      const contractId = account.contract[network].contractId;
      if (!contractObjects[contractId]) {
        const existingAccount = await QuantumPortalContractObjectModel.findOne({
          contractId,
        });
        contractObjects[contractId] = existingAccount;
      }
    }
    return {
      ...account,
      contractObjects,
    };
  }
  return account;
};

export const getAddressDetail = async (address: string): Promise<any> => {
  const addressDetail = await axios.get(
    `${config.explorerUrl}/api/v2/addresses/${address}`,
  );
  return addressDetail.data;
};

export const getAddressLogs = async (address: string): Promise<any> => {
  const addressLogs = await axios.get(
    `${config.explorerUrl}/api/v2/addresses/${address}/logs`,
  );
  return addressLogs.data;
};
