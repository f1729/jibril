import storage, {LocalStorage} from 'node-persist';


interface InitResult {
  firstTime: boolean;
  defaultStorage: LocalStorage;
}

export const initStorage = async (): Promise<InitResult> => {
  const defaultStorage = await makeInstance('./.@jibril-config');
  const config = await defaultStorage.values();

  if (!config.length) {
    await defaultStorage.set('@jibril-login', true);
    await defaultStorage.set('@jibril-collections', []);

    return { firstTime: true, defaultStorage };
  }

  return { firstTime: false, defaultStorage };
};

export const getCurrentCollectionStorage = async (defaultStorage: LocalStorage): Promise<LocalStorage> => {
  const currentCollection = await defaultStorage.get('@jibril-current-collection');
  return await makeInstance(`./.@jibril-collection-${currentCollection}`);
};

export const makeInstance = async (dir: string): Promise<LocalStorage> => {
  const myStorage = storage.create({ dir });
  await myStorage.init({ dir });
  
  return myStorage;
};

export const searchStorage = async (dir: string): Promise<LocalStorage> => {
  await storage.init({ dir });
  return storage;
};

export const getCollections = (defaultStorage: LocalStorage): Promise<string[]> => {
  return defaultStorage.get('@jibril-collections');
};

export const existInCollection = async (defaultStorage: LocalStorage, collection: string): Promise<boolean | string[]> => {
  const collections = await getCollections(defaultStorage);
  return collections.includes(collection) ? true : collections;
};

export const addNewCollection = async (defaultStorage: LocalStorage, collection: string): Promise<void> => {
  const collections = await getCollections(defaultStorage);
  await defaultStorage.set('@jibril-collections', [...collections, collection]);
  await changeCurrentCollection(defaultStorage, collection);
};

export const changeCurrentCollection = async (defaultStorage: LocalStorage, collection: string): Promise<void> => {
  await defaultStorage.set('@jibril-current-collection', collection);
};
