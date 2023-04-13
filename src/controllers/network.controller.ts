import { networkService } from '../services';
import { Request, Response, NextFunction } from 'express';

export const supportedNetwork = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<any> => {
  try {
    const supportedNetworks = await networkService.getSupportedNetworks();
    res.send({ supportedNetworks });
  } catch (error) {
    next(error);
  }
};
