import words from './five-letter-words';

export const playableWords = words;

export const checkExistingWord = (word) => playableWords.find((item) => item === word);
