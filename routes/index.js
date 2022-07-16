const express = require('express');
const router = express.Router();
const skeleton = require('../skeleton');

const app = express();

app.use(express.static('public'))

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'ffmpeg guru | ffmpeg commands generator', skeleton: JSON.stringify(skeleton()) });
});

router.get('/convert', function(req, res, next) {
  res.render('convert', { title: 'Convert' });
});

module.exports = router;
