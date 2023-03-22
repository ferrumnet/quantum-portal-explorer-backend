import { contractService } from '../services';
import { Request, Response } from 'express';

export const registerContract = async (
  req: Request,
  res: Response,
): Promise<any> => {
  const contract = await contractService.registerContract(
    req.body.networks as any,
    req.body.contractAddress as any,
    req.body.contract as any,
  );
  res.send(contract);
};
