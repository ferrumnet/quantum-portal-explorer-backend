import { accountService } from '../services';
import { Request, Response } from 'express';

export const getAccount = async (req: Request, res: Response): Promise<any> => {
  const account = await accountService.getAccount(req.query.address as string);
  res.send(account);
};

export const getAccountTransactions = async (
  req: Request,
  res: Response,
): Promise<any> => {
  const accountTransactions = await accountService.accountTransactions(
    req.query.address as string,
    req.query.page as any,
    req.query.limit as any,
  );
  res.send(accountTransactions);
};

export const getBalances = async (
  req: Request,
  res: Response,
): Promise<any> => {
  //   const balances = accountService.accountBalances(req.query.address as string);
  //   res.send(balances);
};
