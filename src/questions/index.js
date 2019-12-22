import Enquirer from 'enquirer'

const enquirer = new Enquirer()

export const askForADescription = () => {
  return enquirer.prompt([
    {
      name: 'description',
      message: 'Insert word\'s description: ',
      type: 'input'
    }
  ])
}

export const askForAWord = () => {
  return enquirer.prompt([
    {
      name: 'word',
      message: 'Insert your word: ',
      type: 'input'
    }
  ])
}

export const askForACollectionName = () => {
  return enquirer.prompt([
    {
      name: 'collection',
      message: 'Insert a name for your collection: ',
      type: 'input'
    }
  ])
}

