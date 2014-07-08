var express = require('express');
var router = express.Router();

/* GET itest listing. */
router.get('/', function(req, res) {
  res.send('Service UP!!');
});

module.exports = router;
