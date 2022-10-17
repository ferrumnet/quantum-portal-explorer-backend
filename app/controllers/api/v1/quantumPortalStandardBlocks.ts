module.exports = function (router: any) {

  router.get('/list', asyncMiddleware(async (req: any, res: any) => {

    var filter: any = {};

    let quantumPortalStandardBlocks = await db.QuantumPortalStandardBlocks.find(filter)
      .sort({ createdAt: -1 })
      .skip(req.query.offset ? parseInt(req.query.offset) : 0)
      .limit(req.query.limit ? parseInt(req.query.limit) : 10)

    return res.http200({
      quantumPortalStandardBlocks: quantumPortalStandardBlocks
    });

  }));

  router.get('/:id', asyncMiddleware(async (req: any, res: any) => {

    var filter: any = {}
    filter._id = req.params.id;

    let quantumPortalStandardBlock = await db.QuantumPortalStandardBlocks.findOne(filter);

    return res.http200({
      quantumPortalStandardBlock: quantumPortalStandardBlock
    });

  }));

  router.post('/', asyncMiddleware(async (req: any, res: any) => {

    var filter: any = {}

    let quantumPortalStandardBlock = await db.QuantumPortalStandardBlocks.create(req.body);

    return res.http200({
      quantumPortalStandardBlock: quantumPortalStandardBlock
    });

  }));

};
