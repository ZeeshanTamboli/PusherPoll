const express = require('express');
const router = express.Router();

const Pusher = require('pusher');

const pusher = new Pusher({
  appId: '467012',
  key: '4b6ec44709545681c17e',
  secret: 'c1ed02c13c47cf783513',
  cluster: 'ap2',
  encrypted: true
});

router.get('/', (req, res) => {
  res.send('POLL');
});

router.post('/', (req, res) => {
  pusher.trigger('os-poll', 'os-vote', {
    points: 1,
    os: req.body.os
  });

  return res.json({success: true, message: 'Thank you for voting'});
});

module.exports = router;