import {
  QuantumPortalAccountModel,
  QuantumPortalRemoteTransactoinModel,
  QuantumPortalContractObjectModel,
} from '../models';
import { ITransactionListResponse, QuantumPortalAccount } from '../interfaces';
// import ApiError from '../utils/ApiError';
// import httpStatus from 'http-status';

// export const accountTransactions = async (
//   page: number = 0,
//   limit: number = 10,
// ): Promise<ITransactionListResponse> => {
//   const docsPromise = QuantumPortalRemoteTransactoinModel.find()
//     .sort({ timestamp: -1 })
//     .skip((page - 1) * limit)
//     .limit(limit);
//   const countPromise =
//     QuantumPortalRemoteTransactoinModel.countDocuments().exec();

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
