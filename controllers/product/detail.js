var Sequelize = require('sequelize');

// GET /msg
exports.get = {
  handler: function (req, res, next) {
    // the logic of this demo is so simple that
    // only `author` in the query condition

    var sequelize = new Sequelize('md_company', 'root', '123456', {
        host: 'localhost',
        dialect: 'mysql'
    });
    console.log(req.query);
    sequelize.query('SELECT * FROM product_detail where id = ' + req.query.id, { type: sequelize.QueryTypes.SELECT }).then(function (ret) {
      // SELECT query - use then
      console.log(ret);
      res.json({result:true,data:ret});
    },function(ret){
        res.json({result:false,error_msg:ret.message});
    })
  }
};