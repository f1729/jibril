const levenshtein = require('node-levenshtein')

const chalk = require('chalk')
const Table = require('tty-table')

const {
  askForAWord,
  askForADescription,
  askForACollectionName
} = require('../questions')

const log = (message) => console.log(`\n ${message}`)

const addWord = async (currentStorage) => {
  const { word } = await askForAWord()
  const { description } = await askForADescription()

  await currentStorage.init()
  await currentStorage.set(word, { description, phase: 1 })

  log(`${chalk.green(word)} was added correctly ✨`)
  // return { word, description }
}

const deleteWord = async (storage) => {
  const { word } = await askForAWord()

  // return word
}

const test = async (data, currentStorage) => {
  await currentStorage.init()

  for (let datum of data) {
    log(`📝 ${chalk.underline(datum.key)} \n`)

    const { description } = await askForADescription()

    const distance = levenshtein(description, datum.value.description)

    if (distance <= 30) { // I know, it is very naive, any suggestion?
      log(`${chalk.green('Nice you are right!')} 😎`)
      await currentStorage.set(datum.key, {
        ...datum.value,
        phase: datum.value.phase === 4 ? 4 : datum.value.phase + 1,
        phaseDate: new Date()
      })
    } else {
      log(`You are wrong, the answer is: ${chalk.magenta(datum.value.description)} 😞`)
      await currentStorage.set(datum.key, { description, phase: 1 })
    }
  }
}

const autoTest = async (storage) => {
  const getWordsForToday = async (storage) => {
    const items = []
    const data = await storage.data()

    const weeksUntilNow = (date) => Math.round((new Date() - date) / 604800000)

    for (let i of data) {
      const weeks = weeksUntilNow(i.value.phaseDate)

      if (weeks === i.value.phase || i.value.phase === 1) {
        items.push(i)
      }
    }

    return items
  }

  const data = await getWordsForToday(storage)

  if (data.length) {
    test(data, storage)
  } else {
    log(`${chalk.magenta('Jibril:')} ${chalk.yellow('Wait me a short time, for now u dont have to remember nothing')} 😏`)
  }
}

const addCollection = async (defaultStorage) => {
  const { collection: collectionName } = await askForACollectionName()

  const collection = await defaultStorage.get('@jibril-collections')

  // TODO: Manage multiple errors in name
  if (collection.includes(collectionName)) {
    log(`Oh no! This collection ${chalk.red(collectionName)} do exist! 🤔😳🤔🤔, try again!`)
    return
  }

  await defaultStorage.set('@jibril-collections', [...collection, collectionName])

  // If you add a new collection this collection is should be putted as current?
  await defaultStorage.set('@jibril-current-collection', collectionName)

  log(`Nice! You are been created the ${chalk.green(collectionName)} collection 😄`)
}

const metrics = async (currentStorage) => {
  const finalPhase = 4
  const useStyles = () => ({
    phase: {
      headerColor: 'magenta',
      align: 'center',
      width: 10
    },
    keys: {
      headerColor: "cyan",
      color: "white",
      align: "left",
      width: 30
    },
    count: {
      width: 10
    },
    options: {
      borderStyle: 1,
      borderColor: "blue",
      headerAlign: "center",
      align: "center",
      color: "white",
      // truncate: "..."
    }
  })

  const classes = useStyles()
  const data = await currentStorage.data()
  const stats = []

  for (let i = 0; i <= finalPhase; i++) {
    stats.push({
      keys: [],
      count: 0,
      phase: i
    })
  }

  data.forEach(({ value: { phase }, key }) => {
    let stat = stats[phase]
    stats[phase] = {
      ...stat,
      keys: [...stat.keys, key],
      count: stat.count + 1
    }
  })

  let header = [
    { alias: "Phase", value: "phase", ...classes.phase },
    { alias: "Words", value: "keys", ...classes.keys },
    { alias: "Total", value: "count", ...classes.count }
  ]

  const rows = stats.filter(stat => stat.count > 0)

  log(Table(header, rows, classes.options).render())
}


module.exports = {
  addCollection,
  addWord,
  autoTest,
  deleteWord,
  test,
  metrics,
}
