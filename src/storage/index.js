const storage = require('node-persist')

const initStorage = async () => {
  const defaultStorage = await makeInstance('./.@jibril-config')
    const config = await defaultStorage.values()

    if(!config.length) {
      await defaultStorage.set('@jibril-login', true)
      await defaultStorage.set('@jibril-collections', [])

      return { firstTime: true, defaultStorage }
    }

    return { firstTime: false, defaultStorage }
}

const getCurrentCollectionStorage = async (defaultStorage) => {
  const currentCollection = await defaultStorage.get('@jibril-current-collection')

  return await makeInstance(`./.@jibril-collection-${currentCollection}`)
}

const makeInstance = async (dir) => {
  const myStorage = storage.create({ dir })
  await myStorage.init({ dir })

  return myStorage
}

const searchStorage = async (dir) => {
  await storage.init({ dir })

  return storage
}

const getCollections = (defaultStorage) => {
  return defaultStorage.get('@jibril-collections')
}


const existInCollection = async (defaultStorage, collection) => {
  const collections = await getCollections(defaultStorage)

  return collections.includes(collection) ? true : collections
}

const addNewCollection = async (defaultStorage, collection) => {
  await defaultStorage.set('@jibril-collections', [ ...collections, collection ])
  await changeCurrentCollection(defaultStorage, collection)
}

const changeCurrentCollection = async (defaultStorage, collection) => {
  await defaultStorage.set('@jibril-current-collection', collection)
}


module.exports = {
  addNewCollection,
  changeCurrentCollection,
  initStorage,
  makeInstance,
  getCollections,
  getCurrentCollectionStorage,
  existInCollection,
}
