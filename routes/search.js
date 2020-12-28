const express = require('express'),
  router = express.Router();

// search a video
router.get('/videos', (req, res) => {
  if (req.query.q) {
    let sql = `SELECT id, title FROM videos WHERE title LIKE"%${req.query.q}%"`;
    db.query(sql, function(err, data, fields) {
      if (err) throw err;
      res.json({
        status: 200,
        data,
        message: `Video with search=${req.query.q} successful`
      });
    });
  } else {
    res.json({
      status: 500,
      message: "Need to provide an search term (param q)"
    });
  }
});

module.exports = router;
