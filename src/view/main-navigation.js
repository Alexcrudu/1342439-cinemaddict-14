import AbstractView from './abstract.js';
import {MenuItem} from '../const.js';
export default class SiteMenu extends AbstractView {
  constructor(films) {
    super();
    this._films = films;

    this._menuItemChangeHandler = this._menuItemChangeHandler.bind(this);
    this._clickHandler = this._clickHandler.bind(this);
  }

  getTemplate() {
    const filtredFilmsCount = this._films.filter((film) => film.isFavorite).length;

    const watchedFilmsCount = this._films.filter((film) => film.watched.already_watched).length;

    const wishedFilmsCount = this._films.filter((film) => film.isWishList).length;

    return `<nav class="main-navigation">
    <div class="main-navigation__items">
      <a href="#all" data-menu-item =${MenuItem.ALL} class="main-navigation__item main-navigation__item--active">All movies</a>
      <a href="#watchlist" data-menu-item =${MenuItem.WATCHLIST} class="main-navigation__item">Watchlist <span class="main-navigation__item-count">${wishedFilmsCount}</span></a>
      <a href="#history" data-menu-item =${MenuItem.HISTORY} class="main-navigation__item">History <span class="main-navigation__item-count">${watchedFilmsCount}</span></a>
      <a href="#favorites" data-menu-item =${MenuItem.FAVORITES} class="main-navigation__item">Favorites <span class="main-navigation__item-count">${filtredFilmsCount}</span></a>
    </div>
    <a href="#stats" class="main-navigation__additional">Stats</a>
  </nav>`;
  }

  _clickHandler(evt, callback) {
    evt.preventDefault();
    callback();
  }

  statisticClickHandler(callback) {
    // this._callback = callback;
    const statistic = this.getElement().querySelector('.main-navigation__additional');
    statistic.addEventListener('click', (e) => this._clickHandler(e, callback));
  }

  _menuItemChangeHandler(evt, callback) {
    //ßdebugger
    if (evt.target.tagName !== 'A') {
      return;
    }

    //const statistic = this.getElement().querySelector('.main-navigation__additional');

    if (evt.target.classList.contains('main-navigation__additional')) {
      return;
    }

    const activeItem = document.querySelector('.main-navigation__item--active');

    evt.preventDefault();
    callback(evt.target.dataset.menuItem);
    activeItem.classList.remove('main-navigation__item--active');
    evt.target.classList.add('main-navigation__item--active');
  }

  resetMenuItemHandler(curentMenuItem) {
    const activeMenu = document.querySelector('.main-navigation__item--active');
    activeMenu.classList.remove('main-navigation__item--active');
    const menuDataset = document.querySelector(`[data-menu-item = ${curentMenuItem}]`);
    menuDataset.classList.add('main-navigation__item--active');

  }

  setMenuItemChangeHandler(callback) {
    // this._callback = callback;
    this.getElement().addEventListener('click', (e) => this._menuItemChangeHandler(e, callback));
  }
}
