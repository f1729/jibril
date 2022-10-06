# Jibril CLI

![](https://media2.giphy.com/media/QW3qU91Rplde6iy6p1/giphy.gif)



> Jibril CLI helps you to improve your long-term memory of a word with their concept.

## How it works?

- Open your terminal and write: 
  `$ jibril --add`

- You can add a word and then the concept of this word.

- This word will have 4 phases: 
  - In the first phase the word will be asked *daily*, if you respond correctly it will pass to phase 2.
  - In the second phase the word will be asked *weekly*, if you respond correctly it will pass to phase 3.
  - In the thrid phase the word will be asked *every 3 weeks*, if you respond correctly it will pass to phase 4.

- If you answer incorrectly some word in any of this phases, it will return to *phase 1*.


## Install
`$ npm install -g jibril`

## Usage

`$ jibril --add` To add a word.

`$ jibril --review` Init a review of all collection.

`$ jibril --metrics` Show a table with word's phases.

`$ jibril --add-collection` Add a collection and change the current for it.

`$ jibril --change-collection` Change current collection for it.

`$ jibril --test` Init test.


Modify your `.zshrc` file and write in the end `jibril --test`, if you want jibril to inspect if you have any word to remember every time you open the terminal.

