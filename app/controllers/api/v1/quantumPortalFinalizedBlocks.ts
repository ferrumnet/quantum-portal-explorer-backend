module.exports = function (router: any) {

  router.get('/list', asyncMiddleware(async (req: any, res: any) => {

    var filter: any = {};

    let quantumPortalFinalizedBlocks = await db.QuantumPortalFinalizedBlocks.find(filter)
      .sort({ createdAt: -1 })
      .skip(req.query.offset ? parseInt(req.query.offset) : 0)
      .limit(req.query.limit ? parseInt(req.query.limit) : 10)

    return res.http200({
      quantumPortalFinalizedBlocks: quantumPortalFinalizedBlocks
    });

  }));

  router.get('/:id', asyncMiddleware(async (req: any, res: any) => {

    var filter: any = {}
    filter._id = req.params.id;

    let quantumPortalFinalizedBlock = await db.QuantumPortalFinalizedBlocks.findOne(filter);

    return res.http200({
      quantumPortalFinalizedBlock: quantumPortalFinalizedBlock
    });

  }));

  router.post('/', asyncMiddleware(async (req: any, res: any) => {

    var filter: any = {}

    let quantumPortalFinalizedBlock = await db.QuantumPortalFinalizedBlocks.create(req.body);

    return res.http200({
      quantumPortalFinalizedBlock: quantumPortalFinalizedBlock
    });

  }));

  router.delete('/:id', asyncMiddleware(async (req: any, res: any) => {

    var filter: any = {}
    filter._id = req.params.id;

    let quantumPortalFinalizedBlock = await db.QuantumPortalFinalizedBlocks.remove(filter);

    return res.http200({
      quantumPortalFinalizedBlock: quantumPortalFinalizedBlock
    });
    
  }));

};
