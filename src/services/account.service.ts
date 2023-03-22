import {
  QuantumPortalAccountModel,
  QuantumPortalRemoteTransactoinModel,
  QuantumPortalContractObjectModel,
} from '../models';
import { QuantumPortalAccount } from '../interfaces';

export const accountTransactions = async (
  address: string,
  page: number = 0,
  limit: number = 10,
): Promise<any> => {
  address = address.toLocaleLowerCase();
  const transactions = await QuantumPortalRemoteTransactoinModel.find({
    $or: [
      { remoteContract: address },
      { sourceMsgSender: address },
      { sourceBeneficiary: address },
    ],
  })
    .sort({ timestamp: -1 })
    .skip((page - 1) * limit)
    .limit(limit);
  return transactions;
};

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
