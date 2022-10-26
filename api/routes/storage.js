import { Router } from 'express'
import StorageController from '../controllers/storage'
const jwt = require('jsonwebtoken')

const Storage = Router()

Storage.get('/', authenticateToken, StorageController.getStorage)
Storage.get('/item/:id', authenticateToken, StorageController.getItemById)
Storage.post('/create', authenticateToken, StorageController.addItem)
Storage.delete('/delete/:id', authenticateToken, StorageController.deleteItem)
Storage.put('/update/:id', authenticateToken, StorageController.updateItem)

export default Storage

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
