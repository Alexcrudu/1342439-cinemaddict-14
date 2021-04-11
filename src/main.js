import {createUsernameTemplate} from './view/username.js';
import {createMainNavigationTemplate} from './view/main-navigation';
import {createMainSort} from './view/sort';
import {createFilmsList} from './view/films';
import {createShowMoreButton} from './view/show-more-button';
import {createTopRatedFilmsTemplate} from './view/top-rated-films';
import {createMostCommentedFilmsTemplate} from './view/most-commented-films';
// import {createFilmDetailsPopupTemplate} from './view/film-popup';
import {createAllFilmsTemplete} from './view/all-films';
import {filmCardTemplate} from './view/film-card';
import {generateFilmCard} from './mock/film-card';
// import {generateFilmComments} from './mock/comments.js';

const FILMS_COUNT = 22;
const FILMS_COUNT_PER_STEP = 5;

const films = new Array(FILMS_COUNT).fill().map(generateFilmCard);

const render = (container, template) => {
  container.insertAdjacentHTML('beforeend', template);
};

const siteHeader = document.querySelector('.header');

render(siteHeader, createUsernameTemplate());

const siteMain = document.querySelector('.main');

render(siteMain, createMainNavigationTemplate(films));
render(siteMain, createMainSort());
render(siteMain, createFilmsList());

const filmsList = siteMain.querySelector('.films');
const filmCardContainer = filmsList.querySelector('.films-list__container');

for(let i=0; i< Math.min(films.length, FILMS_COUNT_PER_STEP); i++) {
  render(filmCardContainer, filmCardTemplate(films[i]));
}

if (films.length > FILMS_COUNT_PER_STEP) {
  let renderedFilmCount = FILMS_COUNT_PER_STEP;

  render(filmsList, createShowMoreButton());

  const showMoreButton = filmsList.querySelector('.films-list__show-more');

  showMoreButton.addEventListener('click', (evt) => {
    evt.preventDefault();

    films.slice(renderedFilmCount, renderedFilmCount + FILMS_COUNT_PER_STEP).forEach((film) => render(filmCardContainer, filmCardTemplate(film)));

    renderedFilmCount += FILMS_COUNT_PER_STEP;

    if (renderedFilmCount >= films.length) {
      showMoreButton.remove();
    }
  });
}

render(siteMain, createTopRatedFilmsTemplate());
render(siteMain, createMostCommentedFilmsTemplate());

// const siteBody = document.querySelector('body');

// for(let i=0; i< FILMS_COUNT; i++) {
//   render(siteBody, createFilmDetailsPopupTemplate(films[i]), 'beforeend');
// }


const siteFooter = document.querySelector('.footer');

render(siteFooter, createAllFilmsTemplete());

