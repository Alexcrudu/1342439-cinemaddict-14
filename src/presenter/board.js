import SiteMenuView from '../view/main-navigation';
import MainSortView from '../view/sort';
import FilmsListView from '../view/films';
import ShowMoreFilmsButtonView from '../view/show-more-button';
import TopRatedView from '../view/top-rated-films';
import MostCommentedView from '../view/most-commented-films';
import { renderElement, remove, updateItem, RenderPosition} from '../utils.js';
import NoFilmsView from '../view/no-films.js';
import FilmCardPresenter from './film.js';


const FILMS_COUNT_PER_STEP = 5;

export default class Board {
  constructor(boardContainer) {
    this._boardContainer = boardContainer;
    this._renderedFilmCount = FILMS_COUNT_PER_STEP;
    this._renderedFilmList = {};


    this._noComponent = new NoFilmsView();
    this._sortComponent = new MainSortView();
    this._siteListComponent = new FilmsListView();
    this._showMoreButtonComponent = new ShowMoreFilmsButtonView();
    this._topRatedComponent = new TopRatedView();
    this._mostCommentedComponent = new MostCommentedView();
    this._filmComponent = new FilmCardPresenter();

    this._handleFilmChange = this._handleFilmChange.bind(this);
    this._handleShowMoreButtonClick = this._handleShowMoreButtonClick.bind(this);
  }

  init(films) {
    this._films = films.slice();
    this._siteMenuComponent = new SiteMenuView(this._films);
    this._filmComponent = new FilmCardPresenter();
    this._renderBoard();
  }


  _renderSiteList () {
    const template = this._siteListComponent.getElement();
    renderElement(this._boardContainer, template, RenderPosition.BEFOREEND);
  }


  _renderSiteMenu(){
    const template = this._siteMenuComponent.getElement();
    renderElement(this._boardContainer, template, RenderPosition.AFTERBEGIN);
  }


  _renderNoFilms(){
    const template = this._noComponent.getElement();
    renderElement(this._boardContainer, template, RenderPosition.BEFOREEND);
  }


  _renderFilm(film) {
    this._film = film;
    this._filmConteiner = this._siteListComponent.getElement().querySelector('.films-list__container');
    const filmPresenter = new FilmCardPresenter(this._filmConteiner, this._handleFilmChange);
    filmPresenter.init(this._filmConteiner, this._film);
    this._renderedFilmList[film.id] = filmPresenter;
  }


  _handleFilmChange(renderedFilm) {
    this._films = updateItem(this._films, renderedFilm);
    this._clearFilmList();
    this._renderedFilmCount = FILMS_COUNT_PER_STEP;
    this._renderFilms(0, this._renderedFilmCount);
    remove(this._siteMenuComponent);
    this._siteMenuComponent = new SiteMenuView(this._films);
    this._renderSiteMenu();
  }


  _renderFilms(from, to) {
    const filmsListSlice = this._films.slice(from, to);
    filmsListSlice.forEach((film, index) => {
      film.index = index;
      this._renderFilm(film, index);
    });
  }


  _renderShowMoreButton () {
    const template = this._showMoreButtonComponent.getElement();
    renderElement(this._boardContainer, template, RenderPosition.BEFOREEND);

    this._showMoreButtonComponent.setClickHandler(this._handleShowMoreButtonClick);
  }


  _renderSort(){
    const template = this._sortComponent.getElement();
    renderElement(this._boardContainer, template, RenderPosition.BEFOREEND);
  }


  _renderTopRated() {
    const template = this._topRatedComponent.getElement();
    renderElement(this._boardContainer, template, RenderPosition.BEFOREEND);
  }


  _renderMostCommented() {
    const template = this._mostCommentedComponent.getElement();
    renderElement(this._boardContainer, template, RenderPosition.BEFOREEND);
  }


  _clearFilmList() {
    const test = Object.values(this._renderedFilmList);

    test.forEach((film) => film.destroy());
    this._renderedFilmList = {};
    this._renderedFilmCount = FILMS_COUNT_PER_STEP;
  }


  _handleShowMoreButtonClick() {

    this._renderFilms(this._renderedFilmCount, this._renderedFilmCount + FILMS_COUNT_PER_STEP, this._films);
    this._renderedFilmCount += FILMS_COUNT_PER_STEP;

    if (this._renderedFilmCount >= this._films.length) {
      remove(this._showMoreButtonComponent);
    }
  }


  _renderBoard(){

    this._renderSiteMenu();

    this._renderSort();

    this._renderSiteList();


    if(this._films.length === 0) {
      remove(this._showMoreButtonComponent);
      this._renderNoFilms();
    }

    this._renderFilms(0, Math.min(this._films.length, FILMS_COUNT_PER_STEP), this._films);


    if(this._films.length > FILMS_COUNT_PER_STEP){
      this._renderShowMoreButton();
    }

    this._renderTopRated();

    this._renderMostCommented();
  }
}
