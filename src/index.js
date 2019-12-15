import program from 'commander'

import { addWord, deleteWord, test } from './actions';

program
  .version('0.0.1')
  .option('--test', 'Test your memory')
  .option('--add [word] [description]', 'For add a word')
  .option('--delete [word]', 'For delete a word')
  .option('--add-collection [WIP]', 'Flag in progress')
  .parse(process.argv)

if(program.add) {
  addWord()
}
if(program.delete) {
  deleteWord()
}

if(program.test) {
  test()
}

