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

export const addWord = async (storage) => {
  writeTitle('Please add your word and description')

  const { word } = await askForAWord()
  const { description } = await askForADescription()

  await storage.init()
  await storage.set(word, description)

  // return { word, description }
}

export const deleteWord = async (storage) => {
  writeTitle('Please insert a word for delete')

  const { word } = await askForAWord()

  // return word
}

export const test = async (storage) => {
  writeTitle('Go to test!')

  await storage.init()

  storage.forEach(async (datum) => {
    ui.log.write(`-> ${datum.key}`)

    const { description } = await askForADescription()

    // TODO: Implement technique for improve the memory
    if (description === datum.value) {
      ui.log.write('Nice!')
    } else {
      ui.log.write(`You are wrong, the answer is: ${datum.value}`)
    }
  })
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
