'use strict';

const express = require('express');
const router = express.Router();
const unirest = require('unirest');

router.get('/', (req, res, next) => {
  if (req.isAuthenticated()) {
    unirest.get('https://api.linkedin.com/v1/people/~:(id,num-connections,picture-url)')
      .header('Authorization', 'Bearer' + req.user.token)
      .header('x-li-format', 'json')
      .end(response => {
        console.log(response)
        res.render('index', { profile: response.body });
      })
  } else {
    res.render('index', { });
  }
});

module.exports = router;
