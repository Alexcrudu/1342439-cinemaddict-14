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

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const siteHeader = document.querySelector('.header');

render(siteHeader, createUsernameTemplate(), 'beforeend');

const siteMain = document.querySelector('.main');

render(siteMain, createMainNavigationTemplate(), 'beforeend');
render(siteMain, createMainSort(), 'beforeend');
render(siteMain, createFilmsList(), 'beforeend');

const films = siteMain.querySelector('.films');
const filmCardContainer = films.querySelector('.films-list__container');
const filmCards= 5;

for(let i=0; i< filmCards; i++) {
  render(filmCardContainer, filmCardTemplate(), 'beforeend');
}

render(films, createShowMoreButton(), 'beforeend');
render(siteMain, createTopRatedFilmsTemplate(), 'beforeend');
render(siteMain, createMostCommentedFilmsTemplate(), 'beforeend');

// const siteBody = document.querySelector('body');


// render(siteBody, createFilmDetailsPopupTemplate(), 'beforeend');

const siteFooter = document.querySelector('.footer');

render(siteFooter, createAllFilmsTemplete(), 'beforeend');

