import { Request, Response, NextFunction } from 'express';
import { nodeService, blockService } from '../services';

import { ethers } from 'ethers';
import config from '../config/config';

export const syncNode = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const rpc = config.rpcUrl;
    const provider = new ethers.providers.JsonRpcProvider(rpc);
    const currentBlock = await provider.getBlockNumber();
    const lastVisitedBlock = await blockService.getLastBlockNumber();
    await nodeService.processBlockAndTransaction(
      lastVisitedBlock,
      currentBlock,
    );

    res.send({ status: 'ok' });
  } catch (error) {
    next(error);
  }
};
