const Enquirer = require('enquirer')

const enquirer = new Enquirer()

const askForADescription = () => {
  return enquirer.prompt([
    {
      type: 'input',
      name: 'description',
      message: 'Insert word\'s description: '
    }
  ])
}

const askForAWord = () => {
  return enquirer.prompt([
    {
      type: 'input',
      name: 'word',
      message: 'Insert your word: '
    }
  ])
}

const askForACollectionName = () => {
  return enquirer.prompt([
    {
      type: 'input',
      name: 'collection',
      message: 'Insert a name for your collection: '
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

const askIfYouWantToDoTest = () => {
  return enquirer.prompt([
    {
      type: 'toggle',
      name: 'answer',
      message: 'Do you want to answer now?',
      enable: 'Yes',
      disable: 'No',
    }
  ])
}

module.exports = {
  askForACollectionName,
  askForADescription,
  askForAWord,
  askForSelectCollection,
  askIfYouWantToDoTest,
}
