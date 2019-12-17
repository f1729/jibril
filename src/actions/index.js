import inquirer from 'inquirer'

import {
  askForAWord,
  askForADescription,
  askForACollectionName
} from '../questions'

const ui = new inquirer.ui.BottomBar()

const writeTitle = (title) => {
  ui.log.write('\n')
  ui.log.write('===================================')
  ui.log.write(title)
  ui.log.write('===================================')
}

export const addWord = async (currentStorage) => {
  writeTitle('Please add your word and description')

  const { word } = await askForAWord()
  const { description } = await askForADescription()

  await currentStorage.init()
  await currentStorage.set(word, { description, phase: 1 })

  // return { word, description }
}

export const deleteWord = async (storage) => {
  writeTitle('Please insert a word for delete')

  const { word } = await askForAWord()

  // return word
}

export const test = async (data, currentStorage) => {
  writeTitle('Go to test!')

  await currentStorage.init()

  for (let datum of data) {
    ui.log.write(`-> ${datum.key}`)

    const { description } = await askForADescription()

    if (description === datum.value.description) {
      ui.log.write('Nice!')
      await currentStorage.set(datum.key, {
        ...datum.value,
        phase: datum.value.phase === 3 ? 3 : datum.value.phase + 1,
        phaseDate: new Date()
      })
    } else {
      ui.log.write(`You are wrong, the answer is: ${datum.value.description}`)
      await currentStorage.set(datum.key, { description, phase: 1 })
    }
  }
}

export const autoTest = async (storage) => {
  const getWordsForToday = async (storage) => {
    const items = []
    const data = await storage.data()

    const weeksUntilNow = (b) => Math.round((new Date() -b) / 604800000)

    for (let i of data) {
      const weeks = weeksUntilNow(i.value.phaseDate)
      switch (i.value.phase) {
        case 1:
          items.push(i)
          break
        case 2:
          if(weeks === 1) items.push(i)
          break
        case 3:
          if(weeks === 2) items.push(i)
          break
        case 4:
          if(weeks === 4) items.push(i)
          break
        default:
          break
      }
    }

    return items
  }

  const data = await getWordsForToday(storage)

  if (data.length) {
    test(data, storage)
  } else {
    ui.log.write('Wait me a short time, for now u dont have to remember nothing')
  }
}

export const addCollection = async (defaultStorage) => {
  writeTitle('Make a collection')

  const { collection: collectionName } = await  askForACollectionName()

  const collection = await defaultStorage.get('@jibril-collections')

  // TODO: Manage multiple errors in name
  if (collection.includes(collectionName)) {
    ui.log.write(`Oh no! This collection ${collectionName} do exist!, try again`)
    return
  }

  await defaultStorage.set('@jibril-collections', [ ...collection, collectionName ])

  // If you add a new collection this collection is should be putted as current?
  await defaultStorage.set('@jibril-current-collection', collectionName)

  ui.log.write(`Nice! You are been created the ${collectionName} collection`)
}
