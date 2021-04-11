import {getRandomInteger} from '../utils.js';
import {getRandomIndex} from '../utils.js';
import {generateFilmComments} from './comments.js';

const MIN_YEAR = 1980;
const MAX_YEAR = 2020;
const MIN_RATING = 2;
const MAX_RATING = 9;
const MIN_GENRE = 1;
const MAX_DESCRIPTION_COUNT = 5;
const MIN_AGE = 0;
const MAX_AGE = 18;
const MAX_ACTORS = 5;
const MAX_RUNTIME= 100;

const posters = [
  './images/posters/made-for-each-other.png',
  './images/posters/popeye-meets-sinbad.png',
  './images/posters/sagebrush-trail.jpg',
  './images/posters/santa-claus-conquers-the-martians.jpg',
  './images/posters/the-dance-of-life.jpg',
  './images/posters/the-great-flamarion.jpg',
  './images/posters/the-man-with-the-golden-arm.jpg',
];

const filmsTitle = [
  'made-for-each-other',
  'popeye-meets-sinbad',
  'sagebrush-trail',
  'santa-claus-conquers-the-martians',
  'the-dance-of-life',
  'the-great-flamarion',
  'the-man-with-the-golden-arm',
  'titanic',
  'the ocean',
  'the oscar',
  'behind her eyes',
  'let it be',
];

const time = [
  '1h 34m',
  '1h 57m',
  '1h 26m',
  '1h 41m',
  '1h 55m',
  '58m',
  '2h 08m',
  '2h 16',
  '2h 25m',
];

const generateGenre = () => {
  const genre = [
    'Science-Fiction',
    'Fantasy',
    'Horror',
    'Action',
    'Thriller',
    'Dark Drama',
    'Mystery',
  ];

  const genreCount = getRandomInteger(MIN_GENRE, genre.length - 1);

  const newGenres = genre.slice(genreCount);

  return newGenres;
};

const generateDescription = ()=> {
  const descriptionText = [
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    'Cras aliquet varius magna, non porta ligula feugiat eget.',
    'Fusce tristique felis at fermentum pharetra.',
    'Aliquam id orci ut lectus varius viverra.',
    'Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.',
    'Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.',
    'Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.',
    'Sed sed nisi sed augue convallis suscipit in sed felis.',
    'Aliquam erat volutpat.',
    'Nunc fermentum tortor ac porta dapibus.',
    'In rutrum ac purus sit amet tempus.',
  ];

  const description = new Set();

  for(let i = 0; i < getRandomInteger(1, MAX_DESCRIPTION_COUNT); i++) {
    description.add(descriptionText[getRandomInteger(0,descriptionText.length)]);
  }

  return Array.from(description).join('') ;

};

const filmDirectors = [
  'Andrei Tarkovsky',
  'David Lean',
  'John Cassavetes',
  'Roman Polanski',
  'Billy Wilder',
  'Christopher Nolan',
  'David Fincher',
  'Yasujiro Ozu',
  'Orson Welles',
];

const filmWriters = [
  'Quentin Tarantino',
  'Christopher Nolan',
  'Joel Coen',
  'Michael Mann',
  'Frank Darabont',
  'Sergio Leone',
];

const generateActors = () => {
  const filmActors = [
    'Denzel Washington',
    'Dustin Hoffman',
    'Tom Hanks',
    'James Stewart',
    'Lawrence Olivier',
    'Daniel Day-Lewis',
    'Al Pacino',
    'Jack Nicholson',
    'Robert DeNiro',
    'Marlon Brando',
  ];

  const actors = new Set();

  for(let i = 0; i < MAX_ACTORS; i++) {
    actors.add(getRandomIndex(filmActors));
  }

  return Array.from(actors).join('');
};

const country = [
  'Germany',
  'Italy',
  'Spain',
  'Finland',
  'Danemark',
];

export const generateFilmCard = () => {
  return {
    poster: getRandomIndex(posters),
    filmName: getRandomIndex(filmsTitle),
    alternativeFilmName: getRandomIndex(filmsTitle),
    rating: getRandomInteger(MIN_RATING, MAX_RATING) + '.' + getRandomInteger(MIN_RATING, MAX_RATING),
    year: getRandomInteger(MIN_YEAR, MAX_YEAR),
    duration: getRandomIndex(time),
    ageRating: getRandomInteger(MIN_AGE, MAX_AGE),
    directors: getRandomIndex(filmDirectors),
    writers: getRandomIndex(filmWriters),
    genre: generateGenre(),
    description: generateDescription(),
    comments: generateFilmComments(),
    actors: generateActors(),
    release: {
      date: 'date',
      coutry: getRandomIndex(country),
    },
    runtime: getRandomInteger(0, MAX_RUNTIME),
    isWishList: Boolean(getRandomInteger(0, 1)),
    isWatched: Boolean(getRandomInteger(0, 1)),
    isFavorite: Boolean(getRandomInteger(0, 1)),
  };
};
