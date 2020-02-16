# Jibril

![](https://media2.giphy.com/media/QW3qU91Rplde6iy6p1/giphy.gif)



> Jibril CLI helps you to improve your memory about a word and it concept. Jibril was construct with a technique for improve you long-term memory.

## How works?

- Open your terminal and tell: 
  `$ jibril --add`

- You add a word, and then the concept of this word.

- This word will have 4 phases: 
  - In the first phase the word will asked daily, if you respond correctly it pass to phase 2.
  - In the second phase the word will asked weekly, if you respond correctly it pass to phase 3.
  - In the thrid phase the word will asked each 3 weeks, if you respond correctly it pass to pase 4.

- If you respond incorrectly some word, it pass to phase 1.


## Install
`$ npm install -g jibril`

## Usage

`$ jibril --add` For add a word

`$ jibril --review` Init a review of all collection

`$ jibril --metrics` Show a table with word's phases

`$ jibril --add-collection` Add a collection and change for it

`$ jibril --change-collection` Change current collection for it

`$ jibril --test` Init autotest


Modify your `.zshrc` file and write in the end `jibril --test`, if you want jibril to inspect if you have anything to remember every time you open the terminal.

