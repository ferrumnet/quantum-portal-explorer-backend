import express from 'express';
import blockRoute from './block.route';
import transactions from './transactions.route';
import accounts from './accounts.route';
import networkRoute from './network.route';
import contractRoute from './contract.route';
import methodRoute from './method.route';
import explorerRoute from './explorer.route';
import infoRoute from './info.route';
import nodeRoute from './node.route';

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
    path: '/contracts',
    route: contractRoute,
  },
  {
    path: '/methods',
    route: methodRoute,
  },
  {
    path: '/explorer',
    route: explorerRoute,
  },
  {
    path: '/info',
    route: infoRoute,
  },
  {
    path: '/node',
    route: nodeRoute,
  },
];

defaultRoute.forEach(route => {
  router.use(route.path, route.route);
});

export default router;
