const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const restricted = require('./user-model.js')
const Users = require('./user-model.js')



router.post('/register', (req, res) => {
  // implement registration

    
});

router.post('/login', (req, res) => {
  // implement login
});

module.exports = router;
