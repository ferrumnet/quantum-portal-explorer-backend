module.exports = function (router: any) {

  router.get('/list', asyncMiddleware(async (req: any, res: any) => {

    var filter: any = {};

    let quantumPortalTransactions = await db.QuantumPortalTransactions.find(filter).populate('network')
      .sort({ createdAt: -1 })
      .skip(req.query.offset ? parseInt(req.query.offset) : 0)
      .limit(req.query.limit ? parseInt(req.query.limit) : 10)

    return res.http200({
      quantumPortalTransactions: quantumPortalTransactions
    });

  }));

  router.get('/:id', asyncMiddleware(async (req: any, res: any) => {

    var filter: any = {}
    filter._id = req.params.id;

    let quantumPortalTransaction = await db.QuantumPortalTransactions.findOne(filter);

    return res.http200({
      quantumPortalTransaction: quantumPortalTransaction
    });

  }));

  router.post('/', asyncMiddleware(async (req: any, res: any) => {

    var filter: any = {}

    let quantumPortalTransaction = await db.QuantumPortalTransactions.create(req.body);

    return res.http200({
      quantumPortalTransaction: quantumPortalTransaction
    });

  }));

  router.get('/', asyncMiddleware(async (req: any, res: any) => {
    return res.http200({
      message: 'success'
    });

  }));

};
