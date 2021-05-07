import SiteMenuView from '../view/main-navigation';
import MainSortView from '../view/sort';
import FilmsListView from '../view/films';
import ShowMoreFilmsButtonView from '../view/show-more-button';
import TopRatedView from '../view/top-rated-films';
import MostCommentedView from '../view/most-commented-films';
import FilmCardItemView from '../view/film-card';
import { renderElement, remove, updateItem, RenderPosition} from '../utils.js';
import FilmPopupView from '../view/film-popup.js';
import NoFilmsView from '../view/no-films.js';

const FILMS_COUNT_PER_STEP = 5;
// const siteBody = document.querySelector('body');
// const ESC = 'Escape';

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

    this._handleFilmChange = this._handleFilmChange.bind(this);
    this._handleShowMoreButtonClick = this._handleShowMoreButtonClick.bind(this);
    this._setEventListeners = this._setEventListeners.bind(this);
  }

  init(films) {
    this._films = films.slice();
    this._siteMenuComponent = new SiteMenuView(this._films);
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
    const filmCardContainer = document.querySelector('.films-list__container');
    this._newFilmItem = new FilmCardItemView(this._film);
    const template = this._newFilmItem.getElement();
    renderElement(filmCardContainer, template, RenderPosition.BEFOREEND);
    this._renderedFilmList[this._film.id] = this._newFilmItem;

    this._setEventListeners(this._newFilmItem);
    return this._newFilmItem;

  }


  _setEventListeners (renderedFilm){
    this._renderedFilm = renderedFilm;
    this._renderedFilm.setClickHandlerPoster((callbackFilm) => {

      this._filmPopupComponent = new FilmPopupView(callbackFilm);
      this._filmPopupComponent.openElement();

      this._filmPopupComponent.setClickHandler(() => {
        this._filmPopupComponent.closeElement();
      });
    });

    renderedFilm.setWatchListClickHandler((renderedFilm) => {
      debugger
      this._handleFilmChange(
        Object.assign(
          {},
          renderedFilm, { isWishList: !renderedFilm.isWishList},
        ),
      );
    },
    );

    renderedFilm.setWatchedClickHandler((renderedFilm) => {
      this._handleFilmChange(
        Object.assign(
          {},
          renderedFilm, { isWatched: !renderedFilm.isWatched},
        ),
      );
    },
    );

    renderedFilm.setFavoriteClickHandler((renderedFilm) => {
      this._handleFilmChange(
        Object.assign(
          {},
          renderedFilm, { isFavorite: !renderedFilm.isFavorite},
        ),
      );
    },
    );
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

    test.forEach((film) => remove(film));
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
