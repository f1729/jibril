#! /usr/bin/env node

import { Command } from 'commander';
import { initStorage, getCurrentCollectionStorage } from './storage';
import { addCollection, addWord, deleteWord, autoTest, metrics, changeCollection, review } from './actions';
import { askForACollectionName } from './questions';

const program = new Command();

program
  .version('0.1.11')
  .option('--test', 'Auto test in current collection')
  .option('--add', 'For add a word')
  .option('--delete [word]', 'For delete a word')
  .option('--add-collection', 'Add collection')
  .option('--change-collection', 'Change between collections')
  .option('--metrics', 'Show a table of your progress')
  .option('--review', 'Let\'s check your memory!')
  .parse(process.argv);

if (process.argv.length === 2) {
  program.help();
  process.exit(0);
}

(async () => {
  const { firstTime, defaultStorage } = await initStorage();

  if (firstTime) {
    await addCollection(defaultStorage, 'default');
  }

  const currentCollectionStorage = await getCurrentCollectionStorage(defaultStorage);

  if (program.opts().add) {
    await addWord(currentCollectionStorage);
    return;
  }

  if (program.opts().delete) {
    await deleteWord(currentCollectionStorage);
    return;
  }

  if (program.opts().test) {
    await autoTest(currentCollectionStorage);
    return;
  }

  if (program.opts().metrics) {
    await metrics(currentCollectionStorage);
    return;
  }

  if (program.opts().addCollection) {
    const { collection: collectionName } = await askForACollectionName();
    await addCollection(defaultStorage, collectionName);
    return;
  }

  if (program.opts().changeCollection) {
    await changeCollection(defaultStorage);
    return;
  }

  if (program.opts().review) {
    await review(currentCollectionStorage);
    return;
  }
})();
