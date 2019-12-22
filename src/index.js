import program from 'commander'

import { initStorage, getCurrentCollectionStorage } from './storage'

import { addCollection, addWord, deleteWord, autoTest } from './actions'

program
  .version('0.0.1')
  .option('--test [?collection]', 'Test your memory')
  .option('--add [word] [description]', 'For add a word')
  .option('--delete [word]', 'For delete a word')
  .option('--add-collection [WIP]', 'Flag in progress')
  .parse(process.argv)


const init = async () => {
  const { firstTime, defaultStorage } =  await initStorage()

  if(firstTime) await addCollection(defaultStorage)

  const currentCollectionStorage = await getCurrentCollectionStorage(defaultStorage)

  if(program.add) {
    addWord(currentCollectionStorage)
  }

  if(program.delete) {
    deleteWord(currentCollectionStorage)
  }

  if(program.test) {
    autoTest(currentCollectionStorage)
  }
}

init()
