import AbstractView from './abstract.js';
import {MenuItem} from '../const.js';
export default class SiteMenu extends AbstractView {
  constructor(films) {
    super();
    this._films = films;

    this._menuItemChangeHandler = this._menuItemChangeHandler.bind(this);
  }

  getTemplate() {
    const filtredFilmsCount = this._films.filter((film) => film.isFavorite).length;

    const watchedFilmsCount = this._films.filter((film) => film.isWatched).length;

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

  _menuItemChangeHandler(evt) {
    if (evt.target.tagName !== 'A') {
      return;
    }

    const activeItem = document.querySelector('.main-navigation__item--active');

    evt.preventDefault();
    this._callback(evt.target.dataset.menuItem);
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
    this._callback = callback;
    this.getElement().addEventListener('click', this._menuItemChangeHandler);
  }
}
