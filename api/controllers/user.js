import getUserService from '../services/user/get'
import postUserService from '../services/user/post'
import deleteUserService from '../services/user/delete'
import putUserService from '../services/user/put'

const getUsers = async (req, res) => {
  try {
    res.status(200).json(await getUserService.all())
  } catch (e) {
    console.error('%% user controller  ~ getUsers ~ e', e)
    res.status(500).json(e)
  }
}

const getUserById = async (req, res) => {
  try {
    res.json(await getUserService.byId(req.user.id))
  } catch (e) {
    console.error('%% user controller  ~ getUserById ~ e', e)
    res.status(500).json(e)
  }
}

const createUser = async (req, res) => {
  try {
    const { username, email, password } = req.body
    const newUser = await postUserService.create({
      username,
      email,
      password,
    })

    if (newUser?._id) {
      res.status(200).json({ success: true })
    }
  } catch (e) {
    console.error('%% user controller  ~ createUser ~ e', e.message)
    res.json({ success: false, message: e })
  }
}

const deleteUser = async (req, res) => {
  try {
    const userDeleted = await deleteUserService.byId(req.user.id)
    res.status(200).json({ userDeleted })
  } catch (e) {
    console.error('%% user controller ~ deleteUser ~ e', e)
    res.json(e)
  }
}

const updateUserById = async (req, res) => {
  try {
    const { user } = req.body
    const updateUserById = await putUserService.byId(req.user.id, user)
    res.status(200).json(updateUserById)
  } catch (e) {
    console.error('%% user controller ~ updateUserById ~ e', e)
    res.json(e)
  }
}

const login = async (req, res) => {
  try {
    const { username, password } = req.body
    const loggedin = await getUserService.byEmailAndPassword(username, password)
    res.status(200).json(loggedin)
  } catch (e) {
    res.json({ success: false, message: e.message })
  }
}

export default {
  createUser,
  getUsers,
  getUserById,
  deleteUser,
  updateUserById,
  login,
}
