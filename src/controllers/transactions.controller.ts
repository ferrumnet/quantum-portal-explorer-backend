import { transactionsService } from '../services';
import { NextFunction, Request, Response } from 'express';

export const getRecentTransactions = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const transactions = await transactionsService.getRecentTxs(
      req.query.page as any,
      req.query.limit as any,
    );
    res.send(transactions);
  } catch (error) {
    next(error);
  }
};

export const getTransaction = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const tx = await transactionsService.getTransaction(req.params.txId);
    res.send(tx);
  } catch (error) {
    next(error);
  }
};
