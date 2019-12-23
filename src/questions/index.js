const Enquirer = require('enquirer')

const enquirer = new Enquirer()

const askForADescription = () => {
  return enquirer.prompt([
    {
      name: 'description',
      message: 'Insert word\'s description: ',
      type: 'input'
    }
  ])
}

const askForAWord = () => {
  return enquirer.prompt([
    {
      name: 'word',
      message: 'Insert your word: ',
      type: 'input'
    }
  ])
}

const askForACollectionName = () => {
  return enquirer.prompt([
    {
      name: 'collection',
      message: 'Insert a name for your collection: ',
      type: 'input'
    }
  ])
}

const askForSelectCollection = (list) => {
  return enquirer.prompt([
    {
      type: 'select',
      name: 'collection',
      message: 'Select your collection',
      choices: list
    }
  ])
}

module.exports = {
  askForACollectionName,
  askForADescription,
  askForAWord,
  askForSelectCollection,
}
