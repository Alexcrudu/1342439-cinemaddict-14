import AbstractView from './abstract.js';

export default class SiteMenu extends AbstractView {
  constructor(films) {
    super();
    this._films = films;
  }

  getTemplate() {
    const filtredFilmsCount = this._films.filter((film) => film.isFavorite).length;

    const watchedFilmsCount = this._films.filter((film) => film.isWatched).length;

    const wishedFilmsCount = this._films.filter((film) => film.isWishList).length;

    return `<nav class="main-navigation">
    <div class="main-navigation__items">
      <a href="#all" class="main-navigation__item main-navigation__item--active">All movies</a>
      <a href="#watchlist" class="main-navigation__item">Watchlist <span class="main-navigation__item-count">${wishedFilmsCount}</span></a>
      <a href="#history" class="main-navigation__item">History <span class="main-navigation__item-count">${watchedFilmsCount}</span></a>
      <a href="#favorites" class="main-navigation__item">Favorites <span class="main-navigation__item-count">${filtredFilmsCount}</span></a>
    </div>
    <a href="#stats" class="main-navigation__additional">Stats</a>
  </nav>`;
  }
}
