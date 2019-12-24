const { shuffle } = require('@pacote/shuffle')

const weeksUntilNow = (date) => Math.round((new Date() - date) / 604800000)

const enoughDistance = (description) => description.length - Math.round(description.length / 100 * 73)

const getWordsForToday = async (storage) => {
  const items = []
  const data = await storage.data()

  for (let i of data) {
    const weeks = weeksUntilNow(i.value.phaseDate)

    if (weeks === i.value.phase || i.value.phase === 1) {
      items.push(i)
    }
  }

  return items
}

const getRandomWords = async (storage) => {
  const data = await storage.data()
  return shuffle(data)
}

module.exports = {
  enoughDistance,
  getWordsForToday,
  getRandomWords,
}
