import {getRandomIndex} from '../utils.js';
import {getRandomInteger} from '../utils.js';


const emojies = ['smile', 'sleeping', 'puke', 'angry'];
const MAX_COMMENTS = 20;

const commentText = [
  'The words on screen often pass by too quickly to read or comprehend in full',
  'In other films we view words as inscriptions, textures, and forms',
  'Not as transparent carriers of meaning.',
  'In his introduction to the first screening of the retrospective in Los Angeles',
  'Gatten helped assuage some nervousness about this inability to fully grasp everything that appeared on screen.',
  'There will be a lot of words in these films',
  'He explained, speaking with characteristic precision.',
  'You won’t be able to read all of these words.',
  'I expect that this will provoke anxiety.',
  'That is as it should be.',
];


const generateCommentMock = () => {
  return {
    text: getRandomIndex(commentText),
    emoji: getRandomIndex(emojies),
    author: 'author',
    date: 'date',
  };
};

export const generateFilmComments = () => {
  const filmComments = new Set ();

  for (let i=0; i < getRandomInteger(1, MAX_COMMENTS); i++) {
    filmComments.add(generateCommentMock());
  }


  return Array.from(filmComments);
};
