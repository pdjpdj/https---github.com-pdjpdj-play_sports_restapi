const express = require('express'),
  router = express.Router();

// get all videos
router.get('/videos', (req, res) => {
  let sql = `SELECT * FROM videos`;
  if (req.query.id) {
    sql+= ` WHERE id=${req.query.id}`;
  }
  db.query(sql, function(err, data, fields) {
    if (err) throw err;
    res.json({
      status: 200,
      data,
      message: "Videos retrieved successfully"
    })
  })
});

// get all channels
router.get('/channels', (req, res) => {
  let sql = `SELECT * FROM channels`;
  db.query(sql, function(err, data, fields) {
    if (err) throw err;
    res.json({
      status: 200,
      data,
      message: "Channels retrieved successfully"
    })
  })
});

module.exports = router;
