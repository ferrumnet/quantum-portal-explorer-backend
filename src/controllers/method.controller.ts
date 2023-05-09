import { NextFunction, Request, Response } from 'express';
import { methodService } from '../services';

export const callMethod = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const callMethodOnContract = await methodService.callMethod(
      req.query.network as string,
      req.query.contractAddress as string,
      req.query.abi as any,
      req.query.method as string,
      req.query.args as any,
    );
    res.send(callMethodOnContract);
  } catch (error) {
    next(error);
  }
};

export const methodGetTransaction = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const methodTransaction = await methodService.methodGetTransaction(
      req.query.network as string,
      req.query.contractAddress as string,
      req.query.abi as any,
      req.query.method as string,
      req.query.args as string[],
      req.query.from as string,
    );
    res.send(methodTransaction);
  } catch (error) {
    next(error);
  }
};
