import Web3 from 'web3';
import { transactionsService, accountService, blockService } from '../services';
import { Request, Response, NextFunction } from 'express';
import { isTransactionOrBlockHash } from '../utils/constants';
import ApiError from '../utils/ApiError';
import httpStatus from 'http-status';

export const searchData = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    if (
      Web3.utils.isHex(req.query.data as string) &&
      isTransactionOrBlockHash(req.query.data as string)
    ) {
      let hash;
      hash = await transactionsService.getTransaction(req.query.data as string);
      if (!hash) {
        hash = await blockService.getBlockByBlockHash(req.query.data as string);
      }
      if (!hash) {
        next(new ApiError(httpStatus.BAD_REQUEST, 'Not Found'));
      }
      res.send(hash);
    } else if (Web3.utils.isAddress(req.query.data as string)) {
      const account = await accountService.getAccount(req.query.data as string);
      res.send(account);
    } else {
      next(new ApiError(httpStatus.BAD_REQUEST, 'Not Found'));
    }
  } catch (error) {
    next(error);
  }
};
