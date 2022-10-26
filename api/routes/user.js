import { Router } from 'express'
import UserController from '../controllers/user'
const jwt = require('jsonwebtoken')
const User = Router()

User.post('/signup', UserController.createUser)
User.post('/login', UserController.login)
User.get('/:id', UserController.getUserById)
User.put('/:id', authenticateToken, UserController.updateUserById)
User.delete('/:id', authenticateToken, UserController.deleteUser)

export default User

function authenticateToken(req, res, next) {
  const authHeader = req.headers.authorization
  const token = authHeader && authHeader.split(' ')[1]
  if (token == null) {
    return res.sendStatus(401)
  }

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) {
      console.error(err)
      return res.sendStatus(403)
    }
    req.user = user
    next()
  })
}
