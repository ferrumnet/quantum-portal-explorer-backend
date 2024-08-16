import { blockService } from '../services';
import { Request, Response, NextFunction } from 'express';

export const getBlocks = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const block = await blockService.getRecentBlocks(
      parseInt(req.query.page as any),
      parseInt(req.query.limit as any),
    );
    res.send(block);
  } catch (error) {
    next(error);
  }
};

export const getBlockByNumber = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const block = await blockService.getBlockByQuery({
      number: parseInt(req.params.blockNumber as any),
    });
    res.send(block);
  } catch (error) {
    next(error);
  }
};

export const getBlockByHash = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const block = await blockService.getBlockByBlockHash(
      req.query.blockHash as any,
    );
    res.send(block);
  } catch (error) {
    next(error);
  }
};

export const getBlockTxs = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const blocks = await blockService.getBlockTxsByBlockHash(
      req.query.blockHash as string,
      parseInt(req.query.page as any),
      parseInt(req.query.limit as any),
    );
    res.send(blocks);
  } catch (error) {
    next(error);
  }
};
