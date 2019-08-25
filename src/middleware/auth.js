const jwt = require('jsonwebtoken')
const User = require('../models/user')

const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '')
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    const user = await User.findOne({ _id: decoded._id, 'tokens.token' : token })
    // console.log('auth token', token)

    if (!user) {
      throw new Error()
    }
    req.token = token
    req.user = user
    // Makes sure the route handler continues
    next()
  } catch (e) {
    res.status(401).send({ error: 'please authenticate.' + e })
  } 
}

module.exports = auth