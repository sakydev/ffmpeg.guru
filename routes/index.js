var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'ffmpeg guru | ffmpeg commands generator' });
});

router.get('/convert', function(req, res, next) {
  res.render('convert', { title: 'Convert' });
});

module.exports = router;
