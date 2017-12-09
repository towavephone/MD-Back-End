var Sequelize = require('sequelize');
var MySql = require('../../middlewares/mysql');
// GET /msg
exports.get = {
  handler: function (req, res, next) {
    // the logic of this demo is so simple that
    // only `author` in the query condition

    var sequelize = new Sequelize(MySql.table, MySql.username, MySql.password, {
      host: MySql.host,
      dialect: MySql.dialect,
      port: MySql.port
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