import { accountService } from '../services';
import { NextFunction, Request, Response } from 'express';

export const getAccount = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const account = await accountService.getAccount(req.params.address);
    res.send(account);
  } catch (error) {
    next(error);
  }
};

// export const getAccountTransactions = async (
//   req: Request,
//   res: Response,
//   next: NextFunction,
// ): Promise<void> => {
//   try {
//     const accountTransactions = await accountService.accountTransactions(
//       req.query.page as any,
//       req.query.limit as any,
//     );
//     res.send(accountTransactions);
//   } catch (error) {
//     next(error);
//   }
// };

export const getBalances = async (
  req: Request,
  res: Response,
): Promise<void> => {
  //   const balances = accountService.accountBalances(req.query.address as string);
  //   res.send(balances);
};

export const getAddressDetail = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const address = await accountService.getAddressDetail(req.params.address);
    res.send(address);
  } catch (error) {
    next(error);
  }
};

export const getAddressLogs = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const address = await accountService.getAddressLogs(req.params.address);
    res.send(address);
  } catch (error) {
    next(error);
  }
};
