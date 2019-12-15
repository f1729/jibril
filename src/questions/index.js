import inquirer from 'inquirer';

export const askForADescription = () => {
  return inquirer.prompt([
    {
      name: 'description',
      message: 'Insert word\'s description: ',
      type: 'input'
    }
  ])
}

export const askForAWord = () => {
  return inquirer.prompt([
    {
      name: 'word',
      message: 'Insert your word: ',
      type: 'input'
    }
  ])
}

