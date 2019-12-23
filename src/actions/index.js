const levenshtein = require('js-levenshtein')

const chalk = require('chalk')
const Table = require('tty-table')

const {
  addNewCollection,
  changeCurrentCollection,
  existInCollection,
  getCollections
} = require('../storage')

const {
  askForAWord,
  askForADescription,
  askForACollectionName,
  askForSelectCollection,
} = require('../questions')

const log = (message) => console.log(`\n ${message}`)

const jibrilMsg = (message) => log(`${chalk.yellow('Jibril:')} ${chalk.italic.magenta(message)}`)

const addWord = async (currentStorage) => {
  try {
    const { word } = await askForAWord()
    const { description } = await askForADescription()

    await currentStorage.set(word, { description, phase: 1 })

    log(`${chalk.green(word)} was added correctly ✨`)

    // return { word, description }
  } catch (err) {
    jibrilMsg('I will ready, when you are ready')
  }
}

const deleteWord = async (currentStorage) => {
  try {
    const { word } = await askForAWord()

    await currentStorage.del(word)
    jibrilMsg('Done master, I delete this word for you')
    // return word
  } catch (e) {
    jibrilMsg('No problem, I do not delete nothing')
  }
}

const test = async (data, currentStorage) => {
  try {
    for (let datum of data) {
      log(`📝 ${chalk.underline(datum.key)} \n`)

      const {description} = await askForADescription()

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
        await currentStorage.set(datum.key, {description, phase: 1})
      }
    }
  } catch (err) {
    jibrilMsg('We can try later')
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
    jibrilMsg('Wait me a short time, for now u dont have to remember nothing 😏')
  }
}

const addCollection = async (defaultStorage) => {
  try {
    const { collection: collectionName } = await askForACollectionName()

    const collections = await existInCollection(defaultStorage, collectionName)

    // TODO: Manage multiple errors in name
    if (collections === true) {
      jibrilMsg(`Oh no master! This collection ${chalk.red(collectionName)} do exist! 😳🤔, try again!`)
      return
    }

    await addNewCollection(collectionName)

    jibrilMsg(`Nice master! I add the ${chalk.green(collectionName)} collection for you 😄`)
  } catch (e) {
    jibrilMsg('Ok ..., bye bye')
  }
}

const changeCollection = async (defaultStorage) => {
  try {
    const collections = await getCollections(defaultStorage)

    const { collection : collectionName } = await askForSelectCollection(collections)

    await changeCurrentCollection(defaultStorage, collectionName)

    jibrilMsg(`I changed collection for you`)
  } catch (e) {
    jibrilMsg(`When you want master!`)
  }
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
  changeCollection,
  deleteWord,
  test,
  metrics,
}
