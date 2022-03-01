#! /usr/bin/env node

const program = require('commander')

const { initStorage, getCurrentCollectionStorage } = require('./storage')
const { addCollection, addWord, deleteWord, autoTest, metrics, changeCollection, review } = require('./actions')
const { askForACollectionName } = require('./questions')

program
  .version('0.0.1')
  .option('--test', 'Auto test in current collection')
  .option('--add', 'For add a word')
  .option('--delete [word]', 'For delete a word')
  .option('--add-collection', 'Add collection')
  .option('--change-collection', 'Change between collections')
  .option('--metrics', 'Show a table of your progress')
  .option('--review', 'Let\'s check your memory!')
  .parse(process.argv)

if (process.argv.length === 2) {
  return program.help()
}

;(async () => {
  const { firstTime, defaultStorage } = await initStorage()

  if (firstTime) await addCollection(defaultStorage, 'default')

  const currentCollectionStorage = await getCurrentCollectionStorage(defaultStorage)

  if (program.add) {
    return addWord(currentCollectionStorage)
  }

  if (program.delete) {
    return deleteWord(currentCollectionStorage)
  }

  if (program.test) {
    return autoTest(currentCollectionStorage)
  }

  if (program.metrics) {
    return metrics(currentCollectionStorage)
  }

  if (program.addCollection) {
    const { collection: collectionName } = await askForACollectionName()

    return addCollection(defaultStorage, collectionName)
  }

  if (program.changeCollection) {
    return changeCollection(defaultStorage)
  }

  if (program.review) {
    return review(currentCollectionStorage)
  }

})()

