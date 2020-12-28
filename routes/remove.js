const express = require('express'),
  router = express.Router();

// remove a video by id
router.get('/videos', (req, res) => {
  if (req.query.id) {
    let sql = `DELETE FROM videos WHERE id=${req.query.id}`;
    db.query(sql, function(err, data, fields) {
      if (err) throw err;
      res.json({
        status: 200,
        data,
        message: "Video deleted successfully"
      });
    });
  } else {
    res.json({
      status: 500,
      message: "Need to provide an id"
    });
  }
});

module.exports = router;
