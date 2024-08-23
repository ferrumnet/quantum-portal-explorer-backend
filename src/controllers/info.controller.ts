import { Request, Response, NextFunction } from 'express';
import { transactionsService } from '../services';
import axios from 'axios';
import { COINPAPRIKA_API } from '../utils/constants';

export const getInfoData = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    // => To get FRM data
    const response = await axios.get(COINPAPRIKA_API);
    const price = response?.data.quotes.USD.price;
    const marketCapUsd = response?.data.quotes.USD.market_cap;
    const marketCapChange = response?.data.quotes.USD.market_cap_change_24h;
    const volume24h = response?.data?.quotes?.USD?.volume_24h;

    // => to get garph data
    const today = new Date();

    const timestampsForLast7Days: any = [];
    const requestedDays = Number(req.query.days);

    for (let i = 0; i < 7; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() - i);
      date.toISOString();
      const timestamp = getTimestampForDate(date);
      timestampsForLast7Days.push(timestamp);
    }

    var endDate = new Date(); // Current date
    var startDate = new Date(endDate);
    startDate.setDate(endDate.getDate() - requestedDays);

    const startTimeStamp = getTimestampForDate(startDate);
    const endTimeStamp = getTimestampForDate(endDate);

    const transactions = await transactionsService.getDataForChart(
      startTimeStamp,
      endTimeStamp,
    );

    // => to get total Transactions
    const totalTransactions = await transactionsService.totalTransactions();
    const generateLast24HourData = () => {
      const data = [];

      for (let i = 23; i >= 0; i--) {
        const date = new Date();
        date.setHours(date.getHours() - i);
        const volume = Math.floor(Math.random() * (5000 - 1000 + 1)) + 1000;
        data.push({
          date: date.toISOString(),
          volume: volume,
        });
      }

      return data;
    };

    // Example usage for graph data
    const graphData =
      transactions.length > 0 ? transactions : generateLast24HourData();

    res.send({
      frmData: {
        price,
        marketCapUsd,
        marketCapChange,
        volume24h,
      },
      totalTransactions: totalTransactions,
      graphData: graphData,
    });
  } catch (error) {
    next(error);
  }
};

// => To Convert date into seconds
export const getTimestampForDate = (date: Date) => {
  return Math.floor(date.getTime() / 1000);
};
