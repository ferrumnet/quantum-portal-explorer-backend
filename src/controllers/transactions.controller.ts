import { recentTransactionsService } from '../services';
import { Request, Response } from 'express';

export const getTransactions = async (
  req: Request,
  res: Response,
): Promise<any> => {
  const transactions = await recentTransactionsService.getRecentTxs(
    req.query.page as any,
    req.query.limit as any,
  );
  res.send(transactions);
};
