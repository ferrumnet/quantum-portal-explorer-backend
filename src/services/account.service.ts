import {
  QuantumPortalAccountModel,
  QuantumPortalRemoteTransactoinModel,
  QuantumPortalContractObjectModel,
} from '../models';
import { QuantumPortalAccount } from '../interfaces';
import ApiError from '../utils/ApiError';
import httpStatus from 'http-status';

export const accountTransactions = async (
  address: string,
  page: number = 0,
  limit: number = 10,
): Promise<any> => {
  const docsPromise = QuantumPortalRemoteTransactoinModel.find()
    .sort({ timestamp: -1 })
    .skip((page - 1) * limit)
    .limit(limit);
  const countPromise =
    QuantumPortalRemoteTransactoinModel.countDocuments().exec();

  const [totalResults, results] = await Promise.all([
    countPromise,
    docsPromise,
  ]);
  const totalPages = Math.ceil(totalResults / limit);
  const result = {
    results,
    page,
    limit,
    totalPages,
    totalResults,
  };
  return result;
};

export const getAccount = async (address: string): Promise<any> => {
  const rv = await QuantumPortalAccountModel.findOne({ address });
  if (!rv) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Address not found');
    // return {
    //   address: address.toLowerCase(),
    //   contract: {},
    //   isContract: false,
    //   contractObjects: {},
    // };
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