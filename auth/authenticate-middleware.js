const jwt = require('jsonwebtoken');

// const Users = require('../user/user-model.js')

/* 
  complete the middleware code to check if the user is logged in
  before granting access to the next middleware/route handler
*/

module.exports = (req, res, next) => {
  const token = req.headers.authorization;

  if(token) {
      const secret = process.env.JWT_SECRET || 'is it safe?'

      // check that the token is valid
      jwt.verify(token, secret, (err, decodedToken) => {
          if(err) {
              res.status(401).json({  message: 'Invalid Credentials' })
          } else {
              req.decodedJwt = decodedToken;
              next();
          }
      });
  } else {
      res.status(400).json({ message: 'No credentials provided' })
  }
};
