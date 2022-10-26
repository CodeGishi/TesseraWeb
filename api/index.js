import dotenv from 'dotenv'
import User from '../api/routes/user'
import Storage from '../api/routes/storage'
import '../api/config'
const express = require('express')
dotenv.config({ path: `./development.env` })

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use('/users', User)
app.use('/storage', Storage)

export default {
  path: '/api',
  handler: app,
}
