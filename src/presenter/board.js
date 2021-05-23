import SiteMenuView from '../view/main-navigation';
import MainSortView from '../view/sort';
import FilmsListView from '../view/films';
import ShowMoreFilmsButtonView from '../view/show-more-button';
import TopRatedView from '../view/top-rated-films';
import MostCommentedView from '../view/most-commented-films';
import { renderElement, remove, RenderPosition, sortByDate, sortByRating} from '../utils/functions.js';
import { SortType, UpdateType, MenuItem} from '../const.js';
import NoFilmsView from '../view/no-films.js';
import FilmCardPresenter from './film.js';


const FILMS_COUNT_PER_STEP = 5;

export default class Board {
  constructor(boardContainer, filmsModel, commentsModel) {
    this._boardContainer = boardContainer;
    this._filmsModel = filmsModel;
    this._commentsModel = commentsModel;
    this._renderedFilmCount = FILMS_COUNT_PER_STEP;
    this._renderedFilmList = {};
    this._currentSort = SortType.DEFAULT;
    this._currentMenuItem = MenuItem.ALL;


    this._noComponent = new NoFilmsView();
    this._sortComponent = new MainSortView();
    this._siteListComponent = new FilmsListView();
    this._showMoreButtonComponent = new ShowMoreFilmsButtonView();
    this._topRatedComponent = new TopRatedView();
    this._mostCommentedComponent = new MostCommentedView();
    this._filmComponent = new FilmCardPresenter();

    this._handleFilmChange = this._handleFilmChange.bind(this);
    this._handleModelEvent = this._handleModelEvent.bind(this);
    this._handleShowMoreButtonClick = this._handleShowMoreButtonClick.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);
    this._handleMenuItemChange =  this._handleMenuItemChange.bind(this);

    this._filmsModel.addObserver(this._handleModelEvent);
  }

  init() {
    this._siteMenuComponent = new SiteMenuView(this._getFilms());
    this._filmComponent = new FilmCardPresenter();
    this._renderBoard();
  }

  _getFilms() {
    switch (this._currentSort) {
      case SortType.DATE:

        return this._filmsModel.getFilms().slice().sort(sortByDate);
      case SortType.RATING:
        return this._filmsModel.getFilms().slice().sort(sortByRating);
    }
    return this._filmsModel.getFilms();
  }


  _getMenu(){
    this._renderedFilmCount = FILMS_COUNT_PER_STEP;
    const wishListFilms = this._filmsModel.getFilms().filter((film) => film.isWishList);
    const watchedFilms = this._filmsModel.getFilms().filter((film) =>film.isWatched);
    const favoriteFilms = this._filmsModel.getFilms().filter((film) =>film.isFavorite);
    const allFilms = this._filmsModel.getFilms();
    switch (this._currentMenuItem) {
      case MenuItem.WATCHLIST :
        this._clearFilmList();
        this._renderFilms(wishListFilms);
        break;
      case MenuItem.HISTORY :
        this._clearFilmList();
        this._renderFilms(watchedFilms);
        break;
      case MenuItem.FAVORITES:
        this._clearFilmList();
        this._renderFilms(favoriteFilms);
        break;
      default:
        this._clearFilmList();
        this._renderFilms(allFilms);
    }
  }


  _renderSiteList () {
    const template = this._siteListComponent.getElement();
    renderElement(this._boardContainer, template, RenderPosition.BEFOREEND);
  }


  _renderSiteMenu(){
    const template = this._siteMenuComponent.getElement();
    renderElement(this._boardContainer, template, RenderPosition.AFTERBEGIN);
    this._siteMenuComponent.setMenuItemChangeHandler(this._handleMenuItemChange);
  }

  _handleMenuItemChange(menuItem) {
    if(this._currentMenuItem === menuItem) {
      return;
    }
    this._currentMenuItem = menuItem;

    this._getMenu();
  }


  _renderNoFilms(){
    const template = this._noComponent.getElement();
    renderElement(this._boardContainer, template, RenderPosition.BEFOREEND);
  }


  _renderFilm(film) {
    this._film = film;
    this._filmConteiner = this._siteListComponent.getElement().querySelector('.films-list__container');
    const filmPresenter = new FilmCardPresenter(this._filmConteiner, this._handleFilmChange);
    filmPresenter.init(this._filmConteiner, this._film, this._commentsModel);
    this._renderedFilmList[film.id] = filmPresenter;
  }


  _handleFilmChange(updateType, update) {
    // handelviewaction
    // Здесь будем вызывать обновление модели
    // menuitem - действие пользователя, нужно чтобы понять, какой метод модели вызвать
    // updateType - тип изменений, нужно чтобы понять, что после нужно обновить
    // update - обновленные данные
    // this._films = updateItem(this._films, renderedFilm);
    // this._sourcedBoardFilms = updateItem(this._sourcedBoardFilms, renderedFilm);
    this._filmsModel.updateFilm(updateType,update);
    this._clearFilmList();
    this._renderedFilmsOnBoard();
    remove(this._siteMenuComponent);
    this._siteMenuComponent = new SiteMenuView(this._getFilms());
    this._renderSiteMenu();
  }

  _handleModelEvent(updateType, update) {
    // В зависимости от типа изменений решаем, что делать:
    // - обновить часть списка (например, когда поменялось описание)
    // - обновить список (например, когда задача ушла в архив)
    // - обновить всю доску (например, при переключении фильтра)
    switch (updateType) {
      case UpdateType.PATCH:
        this._renderedFilmList[update.id].init(update);
        break;
      case UpdateType.MINOR:
        this._clearFilmList();
        this._renderedFilmsOnBoard();
        break;
      case UpdateType.MAJOR:
        this._clearSort();
        this._renderSort();
        this._clearFilmList();
        this._renderedFilmsList();
        break;
    }
  }


  // _renderFilms(films, from, to,) {
  //   this._films = films;
  //   const filmsListSlice = this._films.slice(from, to);
  //   filmsListSlice.forEach((film, index) => {
  //     film.index = index;
  //     this._renderFilm(film, index);
  //   });
  // }

  _renderFilms(films) {
    films.forEach((film) =>this._renderFilm(film));
  }


  _renderShowMoreButton () {
    const template = this._showMoreButtonComponent.getElement();
    renderElement(this._boardContainer, template, RenderPosition.BEFOREEND);

    this._showMoreButtonComponent.setClickHandler(this._handleShowMoreButtonClick);
  }


  _renderSort(){
    const template = this._sortComponent.getElement();
    renderElement(this._boardContainer, template, RenderPosition.BEFOREEND);
    this._sortComponent.setSortTypeChangeHandler(this._handleSortTypeChange);
  }

  _handleSortTypeChange(sortType) {
    if(this._currentSort === sortType) {
      return;
    }
    this._currentSort = sortType;

    this._clearFilmList();
    this._renderedFilmsOnBoard();
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
  }


  _handleShowMoreButtonClick() {

    const filmCount = this._getFilms().length;

    const newRenderedFilmCount = Math.min(filmCount, this._renderedFilmCount + FILMS_COUNT_PER_STEP);

    const films = this._getFilms().slice(this._renderedFilmCount, newRenderedFilmCount);

    this._renderFilms(films);
    this._renderedFilmCount = newRenderedFilmCount;

    if (this._renderedFilmCount >= filmCount) {
      remove(this._showMoreButtonComponent);
    }
  }

  _renderedFilmsOnBoard () {
    const filmCount = this._getFilms().length;

    const films = this._getFilms().slice(0, Math.min(filmCount, this._renderedFilmCount));

    this._renderFilms(films);

    if (filmCount > FILMS_COUNT_PER_STEP) {
      this._renderShowMoreButton();
    }
  }


  _renderBoard(){

    this._renderSiteMenu();

    this._renderSort();

    this._renderSiteList();


    if(this._getFilms().length === 0) {
      remove(this._showMoreButtonComponent);
      this._renderNoFilms();
    }

    this._renderedFilmsOnBoard();


    this._renderTopRated();

    this._renderMostCommented();
  }
}
