#! /usr/bin/env node

const program = require('commander')

const { initStorage, getCurrentCollectionStorage } = require('./storage')
const { addCollection, addWord, deleteWord, autoTest, metrics } = require('./actions')

program
  .version('0.0.1')
  .option('--test [?collection]', 'Test your memory')
  .option('--add', 'For add a word')
  .option('--delete [word]', 'For delete a word')
  .option('--add-collection [WIP]', 'Flag in progress')
  .option('--metrics', 'Show a table of your progress')
  .parse(process.argv)

if (process.argv.length === 2) {
  return program.help()
}

;(async () => {
  const { firstTime, defaultStorage } = await initStorage()

  if (firstTime) await addCollection(defaultStorage)

  const currentCollectionStorage = await getCurrentCollectionStorage(defaultStorage)
  await currentCollectionStorage.init()

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
})()

