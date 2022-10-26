import getStorageService from '../services/storage/get'
import postStorageService from '../services/storage/post'
import deleteStorageService from '../services/storage/delete'
import putStorageService from '../services/storage/put'

const getStorage = async (req, res) => {
  try {
    const storage = await getStorageService.storageById(req.user.id)
    // console.log('%% storage controller ~ getStorage ~ storage', storage)
    res.status(200).json(storage)
  } catch (e) {
    console.error('%% storage controller ~ getStorageStorage ~ e', e)
    res.json(e)
  }
}

const getItemById = async (req, res) => {
  try {
    const item = await getStorageService.itemById(req.user.id, req.params.id)
    res.status(200).json(item)
  } catch (e) {
    console.error('%% storage controller ~ getItemById ~ e', e)
    res.json(e)
  }
}

const addItem = async (req, res) => {
  try {
    const { item } = req.body
    const addItem = await postStorageService.addItem(req.user.id, item)
    res.status(200).json(addItem)
  } catch (e) {
    console.error('%%  storage controller ~ addNewItem ~ e', e)
    res.status(500).json(e)
  }
}

const updateItem = async (req, res) => {
  try {
    const { item } = req.body
    const { id } = req.params
    const updateItem = await putStorageService.updateItem(req.user.id, id, item)
    res.status(200).json(updateItem)
  } catch (e) {
    console.error('%% storage controller ~ updateItem ~ e', e)
    res.status(500).json(e)
  }
}

const deleteItem = async (req, res) => {
  try {
    const { id } = req.params
    const deletedItem = await deleteStorageService.deleteItem(req.user.id, id)
    res.status(200).json(deletedItem)
  } catch (e) {
    console.error('%% storage controller ~ deleteItem ~ e', e)
    res.status(500).json(e)
  }
}

export default {
  getItemById,
  getStorage,
  addItem,
  updateItem,
  deleteItem,
}
