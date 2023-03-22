import { blockService } from '../services';
import { Request, Response } from 'express';

export const getBlocks = async (req: Request, res: Response): Promise<any> => {
  const block = await blockService.getRecentBlocks(
    parseInt(req.query.page as any),
    parseInt(req.query.limit as any),
  );

  res.send(block);
};

export const getBlockByHash = async (
  req: Request,
  res: Response,
): Promise<any> => {
  const block = await blockService.getBlockByBlockHash(
    req.query.networkId as any,
    req.query.blockHash as any,
  );
  res.send(block);
};

export const getBlockTxs = async (
  req: Request,
  res: Response,
): Promise<any> => {
  const blocks = await blockService.getBlockTxsByBlockHash(
    req.query.blockHash as string,
  );
  res.send(blocks);
};
