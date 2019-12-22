"use strict";

var Enquirer = require('enquirer');

var enquirer = new Enquirer();

var askForADescription = function askForADescription() {
  return enquirer.prompt([{
    name: 'description',
    message: 'Insert word\'s description: ',
    type: 'input'
  }]);
};

var askForAWord = function askForAWord() {
  return enquirer.prompt([{
    name: 'word',
    message: 'Insert your word: ',
    type: 'input'
  }]);
};

var askForACollectionName = function askForACollectionName() {
  return enquirer.prompt([{
    name: 'collection',
    message: 'Insert a name for your collection: ',
    type: 'input'
  }]);
};

module.exports = {
  askForACollectionName: askForACollectionName,
  askForADescription: askForADescription,
  askForAWord: askForAWord
};