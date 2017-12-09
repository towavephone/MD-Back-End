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
    var is_home = req.query.is_home;
    var select_sql = 'SELECT * FROM product';
    if(is_home == 1){
      select_sql += ' where is_home = ' + is_home;
    }
    sequelize.query(select_sql, { type: sequelize.QueryTypes.SELECT }).then(function (ret) {
      // SELECT query - use then
      console.log(ret);
      res.json({result:true,data:ret});
    },function(ret){
        res.json({result:false,error_msg:ret.message});
    })
  }
};