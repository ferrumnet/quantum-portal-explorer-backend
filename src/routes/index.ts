import express from 'express';
import blockRoute from './block.route';
import transactions from './transactions.route';
import accounts from './accounts.route';
import networkRoute from './network.route';
import contractRoute from './contract.route';

const router = express.Router();

const defaultRoute = [
  {
    path: '/blocks',
    route: blockRoute,
  },
  {
    path: '/transactions',
    route: transactions,
  },
  {
    path: '/accounts',
    route: accounts,
  },
  {
    path: '/networks',
    route: networkRoute,
  },
  {
    path: '/contract',
    route: contractRoute,
  },
];

defaultRoute.forEach(route => {
  router.use(route.path, route.route);
});

export default router;
