import UserNameView from './view/username.js';
import AllFilmsView from './view/all-films';
import Api from './api.js';
import { RenderPosition , remove, renderElement, getProfileRating} from './utils/functions.js';
import BoardPresenter from './presenter/board.js';
import FilmsModel from './model/films-model.js';
import LoadingView from './view/loading.js';


const AUTHORIZATION = 'Basic QWERT%$#@!!@#$%TREWQ';
const END_POINT = 'https://14.ecmascript.pages.academy/cinemaddict';
const siteHeader = document.querySelector('.header');
const siteFooter = document.querySelector('.footer');

const api = new Api(END_POINT, AUTHORIZATION);

const filmsModel = new FilmsModel();


const siteMain = document.querySelector('.main');

const boardPresenter = new BoardPresenter(siteMain, filmsModel, api);

const loadingComponent = new LoadingView();

const renderRating = (films) => {

  const watchedFilmsCount = films.filter((film) => film.watched.already_watched).length;

  renderElement(siteHeader, new UserNameView(getProfileRating(watchedFilmsCount)).getElement(), RenderPosition.BEFOREEND);
};


renderElement(siteMain, loadingComponent.getElement(), RenderPosition.BEFOREEND);


api.getFilms()
  .then((films) => {
    filmsModel.setFilms(films);
    remove(loadingComponent);
    renderRating(films);

    boardPresenter.init();
    renderElement(siteFooter, new AllFilmsView(films).getElement(), RenderPosition.BEFOREEND);
  });

