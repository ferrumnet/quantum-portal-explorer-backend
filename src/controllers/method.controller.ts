import { Request, Response } from 'express';
import { methodService } from '../services';

export const callMethod = async (req: Request, res: Response): Promise<any> => {
  const callMethodOnContract = await methodService.callMethod(
    req.query.network as string,
    req.query.contractAddress as string,
    req.query.abi as any,
    req.query.method as string,
    req.query.args as any,
  );
  res.send(callMethodOnContract);
};

export const methodGetTransaction = async (
  req: Request,
  res: Response,
): Promise<any> => {
  const methodTransaction = await methodService.methodGetTransaction(
    req.query.network as string,
    req.query.contractAddress as string,
    req.query.abi as any,
    req.query.method as string,
    req.query.args as string[],
    req.query.from as string,
  );
  res.send(methodTransaction);
};
