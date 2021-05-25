import UserNameView from './view/username.js';
import AllFilmsView from './view/all-films';
import { generateFilmCard } from './mock/film-card';

import { renderElement } from './utils/functions.js';
import BoardPresenter from './presenter/board.js';
import FilmsModel from './model/films-model.js';

const FILMS_COUNT = 22;

const films = new Array(FILMS_COUNT).fill().map(generateFilmCard);

const siteHeader = document.querySelector('.header');

renderElement(siteHeader, new UserNameView().getElement());

const filmsModel = new FilmsModel();
filmsModel.setFilms(films);


const siteMain = document.querySelector('.main');

const boardPresenter = new BoardPresenter(siteMain, filmsModel);

boardPresenter.init();


const siteFooter = document.querySelector('.footer');

renderElement(siteFooter, new AllFilmsView().getElement());

