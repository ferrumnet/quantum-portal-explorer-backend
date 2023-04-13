import { accountService } from '../services';
import { NextFunction, Request, Response } from 'express';

export const getAccount = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<any> => {
  try {
    const account = await accountService.getAccount(req.params.address);
    res.send(account);
  } catch (error) {
    next(error);
  }
};

export const getAccountTransactions = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<any> => {
  try {
    const accountTransactions = await accountService.accountTransactions(
      req.query.address as string,
      req.query.page as any,
      req.query.limit as any,
    );
    res.send(accountTransactions);
  } catch (error) {
    next(error);
  }
};

export const getBalances = async (
  req: Request,
  res: Response,
): Promise<any> => {
  //   const balances = accountService.accountBalances(req.query.address as string);
  //   res.send(balances);
};
