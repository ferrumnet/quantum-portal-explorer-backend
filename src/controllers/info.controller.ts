import { Request, Response, NextFunction } from 'express';
import { transactionsService } from '../services';

export const getInfoData = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const frmData = await transactionsService.fetchStateDataFromCoinGekoAPI();
    const hourlyData = await transactionsService.getDataForChart();
    const totalTransactions = await transactionsService.totalTransactions();
    res.send({
      frmData,
      totalTransactions,
      graphData: hourlyData,
    });
  } catch (error) {
    console.error('Error fetching info data:', error);
    next(error);
  }
};

// Utility function to convert a date to a Unix timestamp (in seconds)
export const convertDateToTimestamp = (date: Date): number => {
  return Math.floor(date.getTime() / 1000);
};
