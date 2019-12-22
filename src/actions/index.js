import {
  askForAWord,
  askForADescription,
  askForACollectionName
} from '../questions'

export const addWord = async (currentStorage) => {
  const { word } = await askForAWord()
  const { description } = await askForADescription()

  await currentStorage.init()
  await currentStorage.set(word, { description, phase: 1 })

  // return { word, description }
}

export const deleteWord = async (storage) => {
  const { word } = await askForAWord()

  // return word
}

export const test = async (data, currentStorage) => {
  await currentStorage.init()

  for (let datum of data) {
    console.log(`-> ${datum.key}`)

    const { description } = await askForADescription()

    if (description === datum.value.description) {
      console.log('Nice!')
      await currentStorage.set(datum.key, {
        ...datum.value,
        phase: datum.value.phase === 3 ? 3 : datum.value.phase + 1,
        phaseDate: new Date()
      })
    } else {
      console.log(`You are wrong, the answer is: ${datum.value.description}`)
      await currentStorage.set(datum.key, { description, phase: 1 })
    }
  }
}

export const autoTest = async (storage) => {
  const getWordsForToday = async (storage) => {
    const items = []
    const data = await storage.data()

    const weeksUntilNow = (date) => Math.round((new Date() - date) / 604800000)

    for (let i of data) {
      const weeks = weeksUntilNow(i.value.phaseDate)

      if (weeks === i.value.phase || i.value.phase === 1) {
        items.push(i)
      }
    }

    return items
  }

  const data = await getWordsForToday(storage)

  if (data.length) {
    test(data, storage)
  } else {
    console.log('Wait me a short time, for now u dont have to remember nothing')
  }
}

export const addCollection = async (defaultStorage) => {
  const { collection: collectionName } = await  askForACollectionName()

  const collection = await defaultStorage.get('@jibril-collections')

  // TODO: Manage multiple errors in name
  if (collection.includes(collectionName)) {
    console.log(`Oh no! This collection ${collectionName} do exist!, try again`)
    return
  }

  await defaultStorage.set('@jibril-collections', [ ...collection, collectionName ])

  // If you add a new collection this collection is should be putted as current?
  await defaultStorage.set('@jibril-current-collection', collectionName)

  console.log(`Nice! You are been created the ${collectionName} collection`)
}
