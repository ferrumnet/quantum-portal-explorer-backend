import { networkService } from '../services';
import { Request, Response } from 'express';

export const supportedNetwork = async (
  req: Request,
  res: Response,
): Promise<any> => {
  const supportedNetworks = await networkService.getSupportedNetworks();
  res.send({ supportedNetworks });
};
