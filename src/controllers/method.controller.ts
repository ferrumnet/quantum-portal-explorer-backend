import { NextFunction, Request, Response } from 'express';
import { methodService } from '../services';
import { AbiItem } from '../interfaces';

export const contractCallMethod = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const response = await methodService.callMethod(
      req.body.network,
      req.body.contractAddress,
      req.body.abi as AbiItem,
      req.body.method,
      req.body.args,
      req.body.from,
    );
    res.send(response);
  } catch (error) {
    next(error);
  }
};

export const contractGetMethod = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const response = await methodService.getMethod(
      req.body.network,
      req.body.contractAddress,
      req.body.abi,
      req.body.method,
      req.body.args,
    );
    res.send(response);
  } catch (error) {
    next(error);
  }
};
