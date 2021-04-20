import {createElement} from '../utils.js';

export default class SiteMenu {
  constructor() {
    this._element = null;
  }

  getTemplate(films) {
    const favoriteFilms = () => {
      const filtredFilms = Array.from(films.filter((film) => film.isFavorite));
      return filtredFilms;
    };

    const watchedFilms = () => {
      const filtredWatchedFilms = Array.from(films.filter((film) => film.isWatched));
      return filtredWatchedFilms;
    };

    const wishedFilms = () => {
      const wishedFilms = Array.from(films.filter((film) => film.isWishList));
      return wishedFilms;
    };

    return `<nav class="main-navigation">
    <div class="main-navigation__items">
      <a href="#all" class="main-navigation__item main-navigation__item--active">All movies</a>
      <a href="#watchlist" class="main-navigation__item">Watchlist <span class="main-navigation__item-count">${wishedFilms().length}</span></a>
      <a href="#history" class="main-navigation__item">History <span class="main-navigation__item-count">${watchedFilms().length}</span></a>
      <a href="#favorites" class="main-navigation__item">Favorites <span class="main-navigation__item-count">${favoriteFilms().length}</span></a>
    </div>
    <a href="#stats" class="main-navigation__additional">Stats</a>
  </nav>`;
  }

  getElement(films) {
    if (!this._element) {
      this._element = createElement(this.getTemplate(films));
    }
    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
