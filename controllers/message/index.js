var Sequelize = require('sequelize');

// GET /msg
exports.get = {
  url: '/msg',
  handler: function (req, res, next) {
    // the logic of this demo is so simple that
    // only `author` in the query condition

    var sequelize = new Sequelize('md_company', 'root', '123456', {
        host: 'localhost',
        dialect: 'mysql'
    });
    var select_sql = 'SELECT * FROM messages';
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
    var sequelize = new Sequelize('md_company', 'root', '123456', {
        host: 'localhost',
        dialect: 'mysql'
    });
    var Message = sequelize.define('message', {
        name: Sequelize.STRING,
        subject: Sequelize.STRING,
        email: Sequelize.STRING,
        message: Sequelize.STRING
    });
    Message.create({
        name: req.body.name,
        subject: req.body.subject,
        email: req.body.email,
        message: req.body.message
    }).then(function(ret){
        console.log(ret);
        res.json({result:true,data:ret});
    }).catch(function(ret){
        res.json({result:false,error_msg:ret.message});
    });
  }
};
