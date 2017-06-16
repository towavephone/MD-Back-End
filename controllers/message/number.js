var Sequelize = require('sequelize');

// GET /msg
exports.get = {
  url: '/msg/number',
  handler: function (req, res, next) {
    // the logic of this demo is so simple that
    // only `author` in the query condition

    var sequelize = new Sequelize('md_company', 'root', '123456', {
        host: 'localhost',
        dialect: 'mysql'
    });
    var select_sql = 'select typeId, COUNT(id) count from messages GROUP BY typeId';
    sequelize.query(select_sql, { type: sequelize.QueryTypes.SELECT }).then(function (ret) {
      // SELECT query - use then
      console.log(ret);
      res.json({result:true,data:ret});
    },function(ret){
        res.json({result:false,error_msg:ret.message});
    })
  }
};