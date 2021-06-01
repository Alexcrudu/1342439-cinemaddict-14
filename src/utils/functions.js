import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import isBetween from 'dayjs/plugin/isBetween';
import isToday from 'dayjs/plugin/isToday';
import { nanoid } from 'nanoid';
import objectSupport from 'dayjs/plugin/objectSupport';
import AbstractView from '../view/abstract.js';
import {StatFilters} from '../const.js';

export const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

export const getRandomIndex = function (list) {
  const randomIndex = getRandomInteger(0, list.length - 1);

  return list[randomIndex];
};

export const renderTemplate = (container, template) => {
  container.insertAdjacentHTML('beforeend', template);
};

export const sortByDate = (filmA, filmB) => {
  return dayjs(filmB.year).diff(dayjs(filmA.year));
};

export const sortByRating = (filmA, filmB) => {
  return filmA.rating - filmB.rating;
};

export const getFilmsStatSorted = (films, statFilter) => {
  const filmsStat = [];

  films.forEach((film) => {
    if(!film.watched.already_watched){
      return;
    }

    switch (statFilter) {
      case StatFilters.TODAY:
        dayjs.extend(isToday);
        dayjs(film.watched.watching_date).isToday() ? filmsStat.push(film) : '';
        break;
      case StatFilters.WEEK:
        dayjs.extend(isBetween);
        dayjs(film.watched.watching_date).isBetween(dayjs().subtract(1, 'week'), dayjs()) ? filmsStat.push(film) : '';
        break;
      case StatFilters.MONTH:
        dayjs.extend(isBetween);
        dayjs(film.watched.watching_date).isBetween(dayjs().subtract(1, 'month'), dayjs()) ? filmsStat.push(film) : '';
        break;
      case StatFilters.YEAR:
        dayjs.extend(isBetween);
        dayjs(film.watched.watching_date).isBetween(dayjs().subtract(1, 'year'), dayjs()) ? filmsStat.push(film) : '';
        break;
    }
  });

  return filmsStat;

};

export const renderElement = (container, element, place) => {
  switch (place) {
    case RenderPosition.AFTERBEGIN:
      container.prepend(element);
      break;
    case RenderPosition.BEFOREEND:
      container.append(element);
      break;
  }
};

export const createElement = (template) => {
  const newElement = document.createElement('div');
  newElement.innerHTML= template;

  return newElement.firstChild;
};

export const remove = (component) => {
  if (!(component instanceof AbstractView)) {
    throw new Error('Can remove only components');
  }

  component.getElement().remove();
  component.removeElement();
};

export const updateItem = (items, update) => {
  const index = items.findIndex((item) => item.id === update.id);

  if (index === -1) {
    return items;
  }

  return [
    ...items.slice(0, index),
    update,
    ...items.slice(index + 1),
  ];
};

export const RenderPosition = {
  AFTERBEGIN: 'afterbegin',
  BEFOREEND: 'beforeend',
};

export const getUtcDateNow = () => {
  dayjs.extend(utc);
  return dayjs.utc().format();
};

export const getWatchedData = () => {
  const isWatched = Boolean(getRandomInteger(0, 1));
  return {
    'already_watched': isWatched,
    'watching_date': isWatched ? `${getRandomInteger(2020,2021)}-${getRandomInteger(3,12)}-${getRandomInteger(10,25)}T00:00:00.000Z` : '',
  };
};

export const getHumanizeDuration = (duration) => {
  dayjs.extend(objectSupport);
  return dayjs({ minute: duration }).format('H[h] m[m]');
};


export const getGenresCounts = (films) => {
  const allGenres = [];
  films.forEach((film) => {
    if(film.watched.already_watched){
      allGenres.push(...film.genre);
    }
  });

  const genresCounts = {};
  allGenres.forEach( (a) => {
    genresCounts[a] = genresCounts[a] + 1 || 1;
  });

  return genresCounts;
};

export const getProfileRating = (countWatched) => {
  if(countWatched === 0) {
    return '';
  }
  else if(countWatched >= 1 && countWatched <= 10) {
    return 'novice';
  }
  else if(countWatched >= 11 && countWatched <= 20) {
    return 'fan';
  }
  else if(countWatched > 20) {
    return 'movie buff';
  }
};

export const generateCommentMock = (commentEmotion,newCommentText) => {
  return {
    id: nanoid(),
    comment:newCommentText,
    emoji: commentEmotion,
    author: 'author',
    date: 'date',
  };
};
