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

  return makeInstance(`./.@jibril-collection-${currentCollection}`)
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

module.exports = {
  initStorage,
  makeInstance,
  getCurrentCollectionStorage,
}
