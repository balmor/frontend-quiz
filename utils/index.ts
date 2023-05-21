import { shuffle } from 'lodash';

export const balmorURL = 'https://balmor.github.io/';

export const formattedQuiz = (quiz: any) => {
  const { quest = [] } = quiz;
  quiz.quest = shuffle(shuffleAnswers(quest));

  return quiz;
};

export const shuffleAnswers = (quest: any) =>
  quest.map(({ question, choices }: any) => ({
    question,
    choices: shuffle(choices),
    correct: choices[0],
  }));

const localStorageSupported =
  typeof window !== 'undefined' &&
  typeof window['localStorage'] != 'undefined' &&
  window['localStorage'] != null;

export const localStorageHelper = {
  load: (key: string = '') => {
    if (localStorageSupported) {
      const result = localStorage.getItem(key);
      if (!result) return {};

      return JSON.parse(result);
    } else {
      return {};
    }
  },

  saveItemToObject: (item: any, storageID: any) => {
    localStorage.setItem(storageID, JSON.stringify(item));
  }
};
