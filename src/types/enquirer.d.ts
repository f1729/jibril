declare module 'enquirer' {
  interface Question {
    type: string;
    name: string;
    message: string;
    choices?: string[];
    initial?: boolean;
  }

  class Enquirer {
    prompt<T>(questions: Question[]): Promise<T>;
  }

  export = Enquirer;
}
