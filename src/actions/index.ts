import chalk from 'chalk';
import Table from 'tty-table';
import { getWordsForToday, getRandomWords, areEquivalents } from '../utils';
import { LocalStorage } from 'node-persist';
import {
  addNewCollection,
  changeCurrentCollection,
  existInCollection,
  getCollections,
} from '../storage';
import {
  askForAWord,
  askForADescription,
  askForACollectionName,
  askForSelectCollection,
  askIfYouWantToDoTest,
} from '../questions';
import { StorageItem } from '../types';

const log = (message: string): void => console.log(`\n ${message}`);

const jibrilMsg = (message: string): void => log(`${chalk.yellow('Jibril:')} ${chalk.italic.magenta(message)}`);

export const addWord = async (currentStorage: LocalStorage): Promise<void> => {
  try {
    const { word } = await askForAWord();
    const { description } = await askForADescription();

    await currentStorage.set(word, { description, phase: 1, phaseDate: new Date() });

    log(`${chalk.green(word)} was added correctly ✨`);
  } catch (err) {
    jibrilMsg('I will ready, when you are ready');
  }
};

export const deleteWord = async (currentStorage: LocalStorage): Promise<void> => {
  try {
    const { word } = await askForAWord();

    await currentStorage.del(word);
    jibrilMsg('Done master, I removed this word for you');
  } catch (e) {
    jibrilMsg('No problem, I do not delete nothing');
  }
};

export const practice = async (currentStorage: LocalStorage, data: StorageItem[], isReview: boolean): Promise<void> => {
  try {
    for (let datum of data) {
      log(`📝 ${chalk.underline(datum.key)} \n`)

      const { description } = await askForADescription()

      if (areEquivalents(datum.value.description, description)) {
        log(`${chalk.green('Nice you are right!')} 😎`)

        !isReview &&
        await currentStorage.set(datum.key, {
          ...datum.value,
          phase: datum.value.phase === 4 ? 4 : datum.value.phase + 1,
          phaseDate: new Date()
        })
      } else {
        log(`You are wrong, the answer is: ${chalk.magenta(datum.value.description)} 😞`)

        !isReview &&
        await currentStorage.set(datum.key, {
          description: datum.value.description, 
          phase: 1
        })
      }
    }
  } catch (err) {
    jibrilMsg('We can try later')
  }
}

export const autoTest = async (currentStorage: LocalStorage): Promise<void> => {
  try {
    const words = await getWordsForToday(currentStorage);

    if (!words.length) {
      return jibrilMsg('You don\'t have words for today');
    }
    const { answer } = await askIfYouWantToDoTest()

    answer && practice(currentStorage, words, false)
  } catch (err) {
    console.log(err)
    jibrilMsg('No problem, we can try later');
  }
};

export const addCollection = async (defaultStorage: LocalStorage, collectionName?: string): Promise<void> => {
  try {
    const name = collectionName || (await askForACollectionName()).collection;
    const collections = await existInCollection(defaultStorage, name);

    if (collections === true) {
      return jibrilMsg('This collection already exists');
    }

    await addNewCollection(defaultStorage, name);
    jibrilMsg(`Done master, I have created the ${name} collection for you`);
  } catch (err) {
    jibrilMsg('No problem, we can try later');
  }
};

export const review = async (currentStorage: LocalStorage): Promise<void> => {
  const words = await getRandomWords(currentStorage);
  
  practice(currentStorage, words, true)
};

export const changeCollection = async (defaultStorage: LocalStorage): Promise<void> => {
  try {
    const collections = await getCollections(defaultStorage);
    const { collection } = await askForSelectCollection(collections);

    await changeCurrentCollection(defaultStorage, collection);
    jibrilMsg('Done master, I changed the collection for you');
  } catch (err) {
    jibrilMsg('No problem, we can try later');
  }
};

export const metrics = async (currentStorage: LocalStorage): Promise<void> => {
  try {
    const data = await currentStorage.data();
    const total = data.length;
    
    if (!total) {
      return jibrilMsg('You do not have words yet');
    }

    const phases = data.reduce((acc: { [key: number]: number }, curr) => {
      const phase = curr.value.phase;
      acc[phase] = (acc[phase] || 0) + 1;
      return acc;
    }, {});

    const header = [
      { value: 'Phase', width: 20, color: 'yellow' },
      { value: 'Words', width: 20, color: 'yellow' },
      { value: 'Percent', width: 20, color: 'yellow' },
    ];

    const rows = Object.entries(phases).map(([phase, words]) => [
      phase,
      words,
      `${Math.round((words / total) * 100)}%`,
    ]);

    const table = Table(header, rows, {
      borderStyle: 1,
      paddingBottom: 0,
      headerAlign: 'center',
      align: 'center',
      color: 'white',
    });

    log(table.render());
  } catch (err) {
    jibrilMsg('No problem, we can try later');
  }
};
