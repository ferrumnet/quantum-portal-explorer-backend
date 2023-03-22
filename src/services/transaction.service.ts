import { QuantumPortalRemoteTransactoinModel } from '../models';

export const getRecentTxs = async (
  page: number,
  limit: number,
): Promise<any> => {
  const txs = await QuantumPortalRemoteTransactoinModel.find()
    .sort({ timestamp: -1 })
    .skip((page - 1) * limit)
    .limit(limit);
  return txs;
};
