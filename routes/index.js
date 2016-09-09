var express = require('express');
var router = express.Router();

/* GET home page. */

router.get('/', function(req, res) {
  var lang = require('../locales/locale-en');


  res.render('index', { title: '', lang: lang });
});

module.exports = router;
