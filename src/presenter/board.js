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
import Statistic from './statistic-presenter.js';


const FILMS_COUNT_PER_STEP = 5;


export default class Board {
  constructor(boardContainer, filmsModel, api) {
    this._boardContainer = boardContainer;
    this._filmsModel = filmsModel;
    this._api = api;
    this._isLoading = true;
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
    this._handleStatistics = this._handleStatistics.bind(this);

    this._filmsModel.addObserver(this._handleModelEvent);
  }

  init() {
    this._filmComponent = new FilmCardPresenter();
    this._films = this._filmsModel.getFilms();
    this._siteMenuComponent = new SiteMenuView(this._films);
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
    this._siteListComponent.show();
    this._showMoreButtonComponent.show();
    this._mostCommentedComponent.show();
    this._topRatedComponent.show();
    this._sortComponent.show();
    this._renderedFilmCount = FILMS_COUNT_PER_STEP;
    const allFilms = this._getFilms();
    const wishListFilms = allFilms.filter((film) => film.isWishList);
    const watchedFilms = allFilms.filter((film) =>film.watched.already_watched);
    const favoriteFilms = allFilms.filter((film) =>film.isFavorite);
    switch (this._currentMenuItem) {
      case MenuItem.WATCHLIST :
        this._currentSort = SortType.DEFAULT;
        this._sortComponent.resetSortTypeHandler();
        this._clearFilmList();
        this._films = wishListFilms;
        this._renderFilms( 0, this._renderedFilmCount);
        break;
      case MenuItem.HISTORY :
        this._currentSort = SortType.DEFAULT;
        this._sortComponent.resetSortTypeHandler();
        this._clearFilmList();
        this._films = watchedFilms;
        this._renderFilms( 0, this._renderedFilmCount);
        break;
      case MenuItem.FAVORITES:
        this._currentSort = SortType.DEFAULT;
        this._sortComponent.resetSortTypeHandler();
        this._films = favoriteFilms;
        this._clearFilmList();
        this._renderFilms(0, this._renderedFilmCount);
        break;
      default:
        this._films = allFilms;
        this._clearFilmList();
        this._renderFilms(0, this._renderedFilmCount);
    }
    if (this._renderedFilmCount >= this._films.length) {
      this._showMoreButtonComponent.hide();
    } else {
      this._showMoreButtonComponent.show();
    }
  }


  _renderSiteList () {
    const template = this._siteListComponent.getElement();
    renderElement(this._boardContainer, template, RenderPosition.BEFOREEND);
  }

  showFilmsList() {
    this._siteListComponent.getElement().classList.remove('visually-hidden');
  }


  _handleStatistics (){
    this._siteListComponent.hide();
    this._mostCommentedComponent.hide();
    this._topRatedComponent.hide();
    this._sortComponent.hide();
    this._currentMenuItem = MenuItem.ALL;
    this._showMoreButtonComponent.hide();
    this._statisticPresenter = new Statistic(this._boardContainer);
    this._statisticPresenter.init(this._getFilms());
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


  _handleFilmChange( update) {
    this._api.updateFilm(update).then(() => {
      this._filmsModel.updateFilm(update);
    })
      .catch((ex) => {
        alert('Update failed: ', ex);
      });
    this._films = this._filmsModel.getFilms();
    this._clearFilmList();
    this._renderFilms(0, Math.min(this._films.length, this._renderedFilmCount));
    remove(this._siteMenuComponent);
    this._siteMenuComponent = new SiteMenuView(this._films);
    this._renderSiteMenu();
    this._getMenu();
    this._siteMenuComponent.resetMenuItemHandler(this._currentMenuItem);
  }

  _handleModelEvent(updateType, update) {
    this._currentSort = SortType.DEFAULT;
    switch (updateType) {
      case UpdateType.PATCH:
        this._renderedFilmList[update.id].init(update);
        break;
      case UpdateType.MINOR:
        this._clearFilmList();
        this._renderFilms( 0, Math.min(this._films.length, this._renderedFilmCount));
        break;
      case UpdateType.MAJOR:
        this._clearSort();
        this._renderSort();
        this._clearFilmList();
        this._renderedFilmsList();
        break;
    }
  }


  _renderFilms( from, to) {
    const filmsListSlice = this._films.slice(from, to);
    filmsListSlice.forEach((film, index) => {
      film.index = index;
      this._renderFilm(film, index);
    });
    this._siteMenuComponent.statisticClickHandler(this._handleStatistics);

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
    this._films = this._getFilms();
    this._renderFilms(0, Math.min(this._films.length, this._renderedFilmCount));
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

    const filmCount = this._films.length;

    const newRenderedFilmCount = Math.min(filmCount, this._renderedFilmCount + FILMS_COUNT_PER_STEP);


    this._renderFilms(this._renderedFilmCount, newRenderedFilmCount);
    this._renderedFilmCount = newRenderedFilmCount;

    if (this._renderedFilmCount >= this._films.length) {
      remove(this._showMoreButtonComponent);
    }
  }

  _renderLoading() {
    renderElement(this._boardContainer, this._loadingComponent.getElement(), RenderPosition.AFTERBEGIN);
  }


  _renderBoard(){
    this._siteMenuComponent.statisticClickHandler(this._handleStatistics);

    this._renderSiteMenu();

    this._renderSort();

    this._renderSiteList();
    if(this._films.length === 0) {
      remove(this._showMoreButtonComponent);
      this._renderNoFilms();
    }


    this._renderFilms( 0, Math.min(this._films.length, this._renderedFilmCount));
    this._showMoreButtonComponent.setClickHandler(this._handleShowMoreButtonClick);


    if (this._films.length > this._renderedFilmCount) {
      this._renderShowMoreButton();
    }


    this._renderTopRated();

    this._renderMostCommented();

  }

}
