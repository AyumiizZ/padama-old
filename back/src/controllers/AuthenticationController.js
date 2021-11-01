const { User } = require("../models");
const jwt = require('jsonwebtoken')
const config = require('../config/config')

function jwtSignUser(user) {
    const ONE_WEEK = 60 * 60 * 24 * 7
    return jwt.sign(user, config.authentication.jwtSecret, {
        expiresIn: ONE_WEEK
    })
}

module.exports = {
  async register(req, res) {
    try {
      res.status(400).send({
        error: "Temporary disabled",
      });
      const user = await User.create(req.body);
      res.send(user.toJSON());
    } catch (err) {
      // email already exits
      res.status(400).send({
        error: "This email account is already in use",
      });
    }
  },
  async login(req, res) {
    try {
      const { username, password } = req.body;
      const user = await User.findOne({
        where: {
          // email: email,
          username: username
        },
      });
      if (!user) {
          return res.status(403).send({
              error: 'The login infomation was incorrect'
          })
      }
      const isPasswordValid = await user.comparePassword(password)
      if (!isPasswordValid) {
        return res.status(403).send({
            error: 'The login infomation was incorrect'
        })
      }
      const userJson = user.toJSON()
      res.send({
          user: userJson,
          token: jwtSignUser(userJson)
      })
    } catch (err) {
        res.status(500).send({
            error: 'An error has occure trying to login'
        })
    }
  },
};
