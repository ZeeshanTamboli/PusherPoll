const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Pusher = require('pusher');

const Vote = require('../models/Vote');

const pusher = new Pusher({
  appId: '467012',
  key: '4b6ec44709545681c17e',
  secret: 'c1ed02c13c47cf783513',
  cluster: 'ap2',
  encrypted: true
});

router.get('/', (req, res) => {
  Vote.find().then(votes => res.json({ success: true, votes: votes }));
});

router.post('/', (req, res) => {
  const newVote = {
    os: req.body.os,
    points: 1
  };

  new Vote(newVote).save().then(vote => {
    pusher.trigger('os-poll', 'os-vote', {
      points: parseInt(vote.points), //Convert String to Integer
      os: vote.os
    });

    return res.json({ success: true, message: 'Thank you for voting' });
  });
});

module.exports = router;
