import {getRandomIndex, getRandomInteger} from '../utils/functions.js';
import { nanoid } from 'nanoid';
import dayjs from 'dayjs';


const emojies = ['smile', 'sleeping', 'puke', 'angry'];
const MAX_COMMENTS = 7;

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

const generateDate = () => {
  const maxYearsGap = -2;
  const maxMonthGap = -11;
  const maxDayGap = -28;
  const maxHourGap = -23;
  const maxMinuteGap = -59;
  const yearGap = getRandomInteger(0, maxYearsGap);
  const monthGap = getRandomInteger(0, maxMonthGap);
  const dayGap = getRandomInteger(0, maxDayGap);
  const hourGap = getRandomInteger(0, maxHourGap);
  const minuteGap = getRandomInteger(0, maxMinuteGap);
  const date = dayjs().add(yearGap, 'y').add(monthGap, 'M').add(dayGap, 'd').add(hourGap, 'h').add(minuteGap, 'm').toDate();
  return dayjs(date).format('YYYY/MM/DD HH:mm');
};


const generateCommentMock = () => {
  return {
    id: nanoid(),
    text: getRandomIndex(commentText),
    emoji: getRandomIndex(emojies),
    author: 'author',
    date: generateDate(),
  };
};

export const generateFilmComments = () => {
  // const filmComments = new Set ();

  // for (let i=0; i < getRandomInteger(1, MAX_COMMENTS); i++) {
  //   filmComments.add(generateCommentMock());
  // }
  const comments = new Array(getRandomInteger(1, MAX_COMMENTS)).fill().map(generateCommentMock);

  // return Array.from(filmComments);
  return comments;
};
