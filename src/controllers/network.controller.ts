import { networkService } from '../services';
import { Request, Response, NextFunction } from 'express';

export const createNetwork = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const setNetwork = await networkService.createNetwork(req.body);
    res.send(setNetwork);
  } catch (error) {
    next(error);
  }
};

export const getAllNetworks = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const networks = await networkService.getAllNetworks(req.params.id as any);
    res.send(networks);
  } catch (error) {
    next(error);
  }
};

export const getNetwork = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const getNetwork = await networkService.getNetwork(req.params.id as any);
    res.send(getNetwork);
  } catch (error) {
    next(error);
  }
};

export const deleteNetwork = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const removeNetwork = await networkService.deleteNetwork(
      req.params.id as any,
    );
    res.send(removeNetwork);
  } catch (error) {
    next(error);
  }
};

export const updateNetwork = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const updateNetwork = await networkService.updateNetwork(
      req.params.id as any,
      req.body,
    );
    res.send(updateNetwork);
  } catch (error) {
    next(error);
  }
};
