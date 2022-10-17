module.exports = function (router: any) {

  router.get('/list', async (req: any, res: any) => {

    var filter: any = {};

    if(req.query.organizationIdentifier){
      filter.organizationIdentifier = req.query.organizationIdentifier;
    }

    if(req.query.status){
      filter.status = req.query.status;
    }

    if(req.query.statusNotEqual){
      filter.status = {$ne: req.query.statusNotEqual};
    }

    if(req.query.userAdress){
      filter.usersAdresses = {$in: (req.query.userAdress).toLowerCase()};
    }

    if(req.query.tokenContractAddress){
      filter.tokenContractAddress = req.query.tokenContractAddress;
    }

    if(req.query.smartTokenContractAddress){
      filter.smartTokenContractAddress = req.query.smartTokenContractAddress;
    }

    if(req.query.type){
      filter.type = req.query.type;
    }

    let pools = await db.Pools.find(filter).populate('network')
      .sort({ createdAt: -1 })
      .skip(req.query.offset ? parseInt(req.query.offset) : 0)
      .limit(req.query.limit ? parseInt(req.query.limit) : 10)

    return res.http200({
      pools: pools
    });

  });

  router.get('/:id', async (req: any, res: any) => {

    var filter: any = {}
    filter._id = req.params.id;

    let pool = await db.Pools.findOne(filter);

    return res.http200({
      pool: pool
    });

  });

  router.get('/', async (req: any, res: any) => {
    return res.http200({
      message: 'success'
    });

  });

};
