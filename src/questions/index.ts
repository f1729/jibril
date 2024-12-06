import Enquirer from 'enquirer';

const enquirer = new Enquirer();

interface DescriptionResponse {
  description: string;
}

interface WordResponse {
  word: string;
}

interface CollectionResponse {
  collection: string;
}

interface TestResponse {
  answer: boolean;
}

export const askForADescription = async (): Promise<DescriptionResponse> => {
  const response = await enquirer.prompt<DescriptionResponse>([
    {
      type: 'input',
      name: 'description',
      message: 'Insert word\'s description: '
    }
  ]);
  return response;
};

export const askForAWord = async (): Promise<WordResponse> => {
  const response = await enquirer.prompt<WordResponse>([
    {
      type: 'input',
      name: 'word',
      message: 'Insert your word: '
    }
  ]);
  return response;
};

export const askForACollectionName = async (): Promise<CollectionResponse> => {
  const response = await enquirer.prompt<CollectionResponse>([
    {
      type: 'input',
      name: 'collection',
      message: 'Insert a name for your collection: '
    }
  ]);
  return response;
};

export const askForSelectCollection = async (list: string[]): Promise<CollectionResponse> => {
  const response = await enquirer.prompt<CollectionResponse>([
    {
      type: 'select',
      name: 'collection',
      message: 'Select your collection',
      choices: list
    }
  ]);
  return response;
};

export const askIfYouWantToDoTest = async (): Promise<TestResponse> => {
  const response = await enquirer.prompt<TestResponse>([
    {
      type: 'toggle',
      name: 'answer',
      message: 'Do you want to answer now?',
      initial: false
    }
  ]);
  return response;
};
