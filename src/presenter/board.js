import SiteMenuView from '../view/main-navigation';
import MainSortView from '../view/sort';
import FilmsListView from '../view/films';
import ShowMoreFilmsButtonView from '../view/show-more-button';
import TopRatedView from '../view/top-rated-films';
import MostCommentedView from '../view/most-commented-films';
import FilmCardItemView from '../view/film-card';
import { renderElement, remove, updateItem } from '../utils.js';
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
    // this._siteMenuComponent = new SiteMenuView();
    this._sortComponent = new MainSortView();
    this._siteListComponent = new FilmsListView();
    this._showMoreButtonComponent = new ShowMoreFilmsButtonView();
    this._topRatedComponent = new TopRatedView();
    this._mostCommentedComponent = new MostCommentedView();

    this._handleFilmChange = this._handleFilmChange.bind(this);
    // this._handleIsWatchedClick = this._handleIsWatchedClick.bind(this);
    this._handleShowMoreButtonClick = this._handleShowMoreButtonClick.bind(this);
  }

  init(films) {
    this._films = films.slice();
    this._renderBoard();


  }


  _renderSiteList () {
    renderElement(this._boardContainer, this._siteListComponent.getElement());
  }

  _renderSiteMenu(){
    this._siteMenuComponent = new SiteMenuView(this._films);
    renderElement(this._boardContainer, this._siteMenuComponent.getElement());
  }


  _renderNoFilms(){
    renderElement(this._boardContainer, this._noComponent.getElement());
  }


  _renderFilm(film) {
    this._film = film;
    const filmCardContainer = document.querySelector('.films-list__container');
    this._newFilmItem = new FilmCardItemView(this._film);
    renderElement(filmCardContainer, this._newFilmItem.getElement());
    this._renderedFilmList[this._film.id] = this._newFilmItem;

    this._setEventListeners(this._newFilmItem);
    // this._newFilmItem.setWatchListClickHandler(this._handleIsWatchedClick);
  }

  _renderFilms(from, to) {
    const filmsListSlice = this._films.slice(from, to);
    filmsListSlice.forEach((film, index) => {
      film.index = index;
      this._renderFilm(film, index);
    });
  }

  _setEventListeners (renderedFilm){
    renderedFilm.setClickHandlerPoster((callbackFilm) => {

      this._filmPopupComponent = new FilmPopupView(callbackFilm);
      this._filmPopupComponent.openElement();

      this._filmPopupComponent.setClickHandler(() => {
        this._filmPopupComponent.closeElement();
      });
    });

    renderedFilm.setWatchListClickHandler((renderedFilm) => {
      this._handleFilmChange(
        Object.assign(
          {},
          renderedFilm, { isWatched: !renderedFilm.isWatched},
        ),
      );
    },
    );
  }

  _handleFilmChange(renderedFilm) {
    // console.log(this._films, this._renderedFilmList);
    // debugger
    this._films = updateItem(this._films, renderedFilm);
    this._renderedFilmList[renderedFilm.id] = this._renderFilm(renderedFilm);
    console.log(this._films, this._renderedFilmList);

  }

  // _handleIsWatchedClick() {
  //   this._handleFilmChange(
  //     Object.assign(
  //       {},
  //       film, { isWatched: !film.isWatched},
  //     ),
  //   );
  // }


  _handleShowMoreButtonClick() {

    this._renderFilms(this._renderedFilmCount, this._renderedFilmCount + FILMS_COUNT_PER_STEP);
    this._renderedFilmCount += FILMS_COUNT_PER_STEP;

    if (this._renderedFilmCount >= this._films.length) {
      remove(this._showMoreButtonComponent);
    }
  }

  _renderShowMoreButton () {
    renderElement(this._boardContainer, this._showMoreButtonComponent.getElement());

    this._showMoreButtonComponent.setClickHandler(this._handleShowMoreButtonClick);
  }


  _renderSort(){
    renderElement(this._boardContainer, this._sortComponent.getElement());
  }

  _renderTopRated() {
    renderElement(this._boardContainer, this._topRatedComponent.getElement());
  }

  _renderMostCommented() {
    renderElement(this._boardContainer, this._mostCommentedComponent.getElement());
  }

  _clearFilmList() {
    const test = Object.values(this._renderedFilmList);

    test.forEach((film) => remove(film));
    this._renderedFilmList = {};
    this._renderedFilmCount = FILMS_COUNT_PER_STEP;
    remove(this._showMoreButtonComponent);
  }

  _renderBoard(){

    this._renderSiteMenu();

    this._renderSort();

    this._renderSiteList();


    if(this._films.length === 0) {
      this._renderNoFilms();
    }

    this._renderFilms(0, Math.min(this._films.length, FILMS_COUNT_PER_STEP));


    if(this._films.length > FILMS_COUNT_PER_STEP){
      this._renderShowMoreButton();
    }

  }
}
