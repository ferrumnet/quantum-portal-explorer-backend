import { transactionsService } from '../services';
import { NextFunction, Request, Response } from 'express';

export const getTransactions = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const transactions = await transactionsService.getTxs(
      req.query.page as any,
      req.query.limit as any,
      req.query.address as any,
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
