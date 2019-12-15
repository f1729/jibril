import storage from 'node-persist'
import inquirer from 'inquirer'

import { askForAWord, askForADescription } from '../questions'

const ui = new inquirer.ui.BottomBar()

const writeTitle = (title) => {
  ui.log.write('\n');
  ui.log.write('===================================');
  ui.log.write(title);
  ui.log.write('===================================');
}

export const addWord = async () => {
  writeTitle('Please add your word and description')

  const { word } = await askForAWord()
  const { description } = await askForADescription()

  await storage.init()
  await storage.set(word, description)

  // return { word, description }
}

export const deleteWord = async () => {
  writeTitle('Please insert a word for delete')

  const { word } = await askForAWord()

  // return word
}

export const test = async () => {
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
