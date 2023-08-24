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
    let hash;
    const queryData: any = {};
    const type = req.query.type;
    const page = parseInt(req.query.page as any);
    const limit = parseInt(req.query.limit as any);

    // If there is any filter in query
    if (req.query.fromNetwork) {
      queryData.networkId = req.query.fromNetwork;
    }
    if (req.query.toNetwork) {
      queryData.remoteNetworkId = req.query.toNetwork;
    }
    if (req.query.fromDate && req.query.toDate) {
      queryData.$and = [
        { timestamp: { $gte: req.query.fromDate } },
        { timestamp: { $lte: req.query.toDate } },
      ];
    } else if (req.query.fromDate) {
      queryData.timestamp = req.query.fromDate;
    } else if (req.query.toDate) {
      queryData.timestamp = req.query.toDate;
    }

    // ==> First Case: (only data)
    if (req.query.data && !Object.keys(queryData).length && !type) {
      if (
        Web3.utils.isHex(req.query.data as string) &&
        isTransactionOrBlockHash(req.query.data as string)
      ) {
        hash = await transactionsService.getTransaction(
          req.query.data as string,
        );
        if (!hash) {
          hash = await blockService.getBlockByBlockHash(
            req.query.data as string,
          );
        }
        res.send(hash);
      } else if (Web3.utils.isAddress(req.query.data as string)) {
        const account = await accountService.getAccount(
          req.query.data as string,
        );
        res.send(account);
      }
    }

    // ==> 2nd Case: Data + noFilters + type
    else if (req.query.data && !Object.keys(queryData).length && type) {
      if (
        type === 'transactions' &&
        Web3.utils.isHex(req.query.data as string) &&
        isTransactionOrBlockHash(req.query.data as string)
      ) {
        hash = await transactionsService.getTransaction(
          req.query.data as string,
        );

        res.send(hash);
      } else if (
        type === 'blocks' &&
        Web3.utils.isHex(req.query.data as string) &&
        isTransactionOrBlockHash(req.query.data as string)
      ) {
        hash = await blockService.getBlockByBlockHash(req.query.data as string);
        res.send(hash);
      }
    }

    // ==> 3rd Case: Data + filters + type
    else if (req.query.data && Object.keys(queryData).length && type) {
      if (
        type === 'transactions' &&
        Web3.utils.isHex(req.query.data as string) &&
        isTransactionOrBlockHash(req.query.data as string)
      ) {
        queryData.hash = req.query.data;
        hash = await transactionsService.getTransactionByQuery(queryData);
        res.send(hash);
      } else if (
        type === 'blocks' &&
        Web3.utils.isHex(req.query.data as string) &&
        isTransactionOrBlockHash(req.query.data as string)
      ) {
        queryData.blockHash = req.query.data;
        hash = await blockService.getBlockByQuery(queryData);
        res.send(hash);
      }
    }

    // ==> 4th Case: Data + Filters + noType
    else if (req.query.data && Object.keys(queryData).length && !type) {
      if (
        Web3.utils.isHex(req.query.data as string) &&
        isTransactionOrBlockHash(req.query.data as string)
      ) {
        hash = await transactionsService.getTransactionByQuery(queryData);
        if (!hash) {
          hash = await blockService.getBlockByQuery(queryData);
        }
        res.send(hash);
      } else if (Web3.utils.isAddress(req.query.data as string)) {
        const account = await accountService.getAccount(
          req.query.data as string,
        );
        res.send(account);
      }
    }

    // 5th Case: no data + if filters + type
    else if (!req.query.data && type) {
      if (type === 'transactions') {
        const txs = await transactionsService.getAllTransactions(
          page,
          limit,
          queryData,
        );
        res.send(txs);
      } else if (type === 'blocks') {
        const blocks = await blockService.getAllBlocks(page, limit, queryData);
        res.send(blocks);
      }
    }

    // 6th Case: noData + noFilters + notype
    else if (!req.query.data && !Object.keys(queryData).length && !type) {
      return next(
        new ApiError(httpStatus.BAD_REQUEST, 'No Address & No Type Provided'),
      );
    }

    // 7th Case: noData + Filters + noType
    else if (!req.query.data && Object.keys(queryData).length && !type) {
      return next(
        new ApiError(httpStatus.BAD_REQUEST, 'No Address & No Type Provided'),
      );
    }
  } catch (error) {
    next(error);
  }
};
