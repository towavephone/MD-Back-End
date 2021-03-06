var Sequelize = require('sequelize');
var MySql = require('../../middlewares/mysql');
// GET /msg
exports.get = {
  url: '/msg',
  handler: function (req, res, next) {
    // the logic of this demo is so simple that
    // only `author` in the query condition

    var sequelize = new Sequelize(MySql.table, MySql.username, MySql.password, {
        host: MySql.host,
        dialect: MySql.dialect,
        port: MySql.port
    });
    var select_sql = 'SELECT * FROM messages';
    if(req.query.id){
        select_sql += ' where typeId = ' + req.query.id;
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

// post new message
// POST /msg/add
exports.post = {
  url: '/msg/add',
  handler: function (req, res, next) {
    var sequelize = new Sequelize(MySql.table, MySql.username, MySql.password, {
        host: MySql.host,
        dialect: MySql.dialect,
        port: MySql.port
    });
    var Message = sequelize.define('message', {
        name: Sequelize.STRING,
        subject: Sequelize.STRING,
        email: Sequelize.STRING,
        message: Sequelize.STRING,
        typeId: Sequelize.INTEGER
    });
    Message.create({
        name: req.body.name,
        subject: req.body.subject,
        email: req.body.email,
        message: req.body.message,
        typeId: req.body.typeId,
    }).then(function(ret){
        console.log(ret);
        res.json({result:true,data:ret});
    }).catch(function(ret){
        res.json({result:false,error_msg:ret.message});
    });
  }
};
