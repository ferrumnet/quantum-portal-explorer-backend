import { contractService } from '../services';
import { Request, Response, NextFunction } from 'express';

export const registerContract = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const contract = await contractService.registerContract(
      req.body.networks as any,
      req.body.contractAddress as any,
      req.body.contract as any,
    );
    res.send(contract);
  } catch (error) {
    next(error);
  }
};
