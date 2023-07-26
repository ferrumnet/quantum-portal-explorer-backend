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
    const queryData: any = {};
    if (req.query.fromNetwork) {
      queryData.networkId = req.query.fromNetwork;
    }
    if (req.query.toNetwork) {
      queryData.remoteNetworkId = req.query.toNetwork;
    }
    if (req.query.fromDate && req.query.tDate) {
      queryData.$and = [
        { timestamp: { $gte: req.query.fromDate } },
        { timestamp: { $lte: req.query.toDate } },
      ];
    } else if (req.query.fromDate) {
      queryData.timestamp = { $gte: req.query.fromDate };
    } else if (req.query.toDate) {
      queryData.timestamp = { $lte: req.query.toDate };
    }
    if (
      Web3.utils.isHex(req.query.data as string) &&
      isTransactionOrBlockHash(req.query.data as string)
    ) {
      let hash;
      hash = await transactionsService.getTransactionByQuery({
        ...queryData,
        hash: req.query.data,
      });
      if (!hash.length) {
        hash = await blockService.getBlockByQuery({
          ...queryData,
          blockHash: req.query.data,
        });
      }
      if (!hash.length) {
        return next(new ApiError(httpStatus.BAD_REQUEST, 'Not Found'));
      }
      res.send(hash);
    } else if (Web3.utils.isAddress(req.query.data as string)) {
      const account = await accountService.getAccount(req.query.data as string);
      res.send(account);
    } else {
      return next(new ApiError(httpStatus.BAD_REQUEST, 'Not Found'));
    }
  } catch (error) {
    next(error);
  }
};
