var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    var userID = typeof req.session.user_id == 'undefined' ? '' : req.session.user_id;
  res.render('index', { title: 'Social Network', userID});

});

module.exports = router;
