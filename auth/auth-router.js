const router = require('express').Router();
const bcrypt = require('bcryptjs');

const Users = require('../user/user-model.js')
const {validateUser} = require('../user/validateUser.js')
const getToken = require('./getJwtToken.js')



router.post('/register', (req, res) => {
  // implement registration
  let user = req.body;

  const validateResult = validateUser(user)
  console.log(validateResult)

  if(validateResult.isSuccessful === true) {
    const hash = bcrypt.hashSync(user.password, 12);
    user.password = hash;

    Users.add(user)
      .then(saved => {
        const token = getToken(saved)
        res.status(201).json(token);
      })
      .catch(error => {
        res.status(500).json(error)
      })
  } else {
    res.status(400).json({ message: 'Invalid info about the user, see errors for details.', errors: validateResult.errors })
  }
  
});

router.post('/login', (req, res) => {
  // implement login
  let { username, password } = req.body;

  Users.findBy({ username })
    .first()
    .then(user => {
      if(user && bcrypt.compareSync(password, user.password)) {
        const token = getToken(user);
        res.status(200).json({
          message: `Welcome ${user.username}!`,
          token
        });
      } else {
        res.status(401).json({ message: 'You shall not pass!' });
      }
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

module.exports = router;
