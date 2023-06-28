import { EntryFields, Asset, Entry } from 'contentful';

export interface IQuizQuestions {
  choices: string[];
  question: string;
  correct?: string;
}

export interface IQuizShuffle extends IQuizQuestions {
  correct: string;
}

export interface IQuizFields {
  image: Asset;
  new: EntryFields.Boolean;
  quest: IQuizQuestions[];
  slug: EntryFields.Text;
  subtitle: EntryFields.Text;
  topic: EntryFields.Text;
}

export interface PropsHome {
  items: Entry<IQuizFields>[];
}

export interface CartQuiz {
  fields: IQuizFields;
}

export interface PropsCartQuiz {
  quiz: CartQuiz;
}

export interface IQuiz {
  quiz: IQuizFields;
}

export interface IResult {
  score: number;
  correctAnswers: number;
  wrongAnswers: number;
  percent: number;
}

export interface ITimeResult extends IResult {
  finishTime: string;
}

export interface ISlug {
  slug: string;
}
export interface IPath {
  params: ISlug;
}