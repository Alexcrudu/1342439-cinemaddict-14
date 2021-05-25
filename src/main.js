import UserNameView from './view/username.js';
import AllFilmsView from './view/all-films';
import { generateFilmCard } from './mock/film-card';
import { generateCommentMock } from './mock/comments.js';
import { renderElement } from './utils/functions.js';
import BoardPresenter from './presenter/board.js';
import FilmsModel from './model/films-model.js';
import CommentsModel from './model/comments-model.js';
import { getRandomInteger} from './utils/functions.js';

const FILMS_COUNT = 22;
const MAX_COMMENTS = 20;

const films = new Array(FILMS_COUNT).fill().map(generateFilmCard);
const comments = new Array(getRandomInteger(1, MAX_COMMENTS)).fill().map(generateCommentMock);

const siteHeader = document.querySelector('.header');

renderElement(siteHeader, new UserNameView().getElement());

const filmsModel = new FilmsModel();
filmsModel.setFilms(films);

const commentsModel = new CommentsModel();
commentsModel.setComments(comments);

const siteMain = document.querySelector('.main');

const boardPresenter = new BoardPresenter(siteMain, filmsModel, commentsModel);

boardPresenter.init();


const siteFooter = document.querySelector('.footer');

renderElement(siteFooter, new AllFilmsView().getElement());
