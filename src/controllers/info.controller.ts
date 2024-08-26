import { Request, Response, NextFunction } from 'express';
import { transactionsService } from '../services';
import axios from 'axios';
import { COINGECKO_API } from '../utils/constants';

export const getInfoData = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    // Fetch FRM data from CoinGecko API
    const { data } = await axios.get(COINGECKO_API);

    const frmPrice = data?.market_data.current_price.usd;
    const frmPriceChangePercentage =
      data?.market_data.price_change_percentage_24h;
    const frmMarketCap = data?.market_data.market_cap.usd;
    const frmMarketCapChangePercentage =
      data?.market_data.market_cap_change_percentage_24h;
    const frmVolume24h = data?.market_data.total_volume.usd;

    // Fetch graph data for the last 24 hours
    const now = new Date();
    const oneDayAgo = new Date(now);
    oneDayAgo.setDate(now.getDate() - 1);

    const startTimeStamp = convertDateToTimestamp(oneDayAgo);
    const endTimeStamp = convertDateToTimestamp(now);

    const transactions = await transactionsService.getDataForChart(
      startTimeStamp,
      endTimeStamp,
    );

    // Fetch total transactions
    const totalTransactions = await transactionsService.totalTransactions();
    const generateLast24HourData = () => {
      const data = [];

      for (let i = 23; i >= 0; i--) {
        const date = new Date();
        date.setHours(date.getHours() - i);
        const volume = Math.floor(Math.random() * (5000 - 1000 + 1)) + 1000;
        data.push({
          // date: date.toISOString(),
          volume: volume,
        });
      }

      return data;
    };

    // Example usage for graph data
    const graphData =
      transactions.length > 0 ? transactions : generateLast24HourData();
    // Send data to the frontend
    res.send({
      frmData: {
        price: frmPrice,
        priceChangePercentage: frmPriceChangePercentage,
        marketCap: frmMarketCap,
        marketCapChangePercentage: frmMarketCapChangePercentage,
        volume24h: frmVolume24h,
      },
      totalTransactions,
      graphData,
    });
  } catch (error) {
    next(error);
  }
};

// Utility function to convert a date to a Unix timestamp (in seconds)
export const convertDateToTimestamp = (date: Date): number => {
  return Math.floor(date.getTime() / 1000);
};
