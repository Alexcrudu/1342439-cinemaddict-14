import AbstractView from './abstract.js';

export default class FilmCardItem extends AbstractView {
  constructor(film) {
    super();

    this._film = film;

    this._clickHandler = this._clickHandler.bind(this);
    this._watchListClickHandler = this._watchListClickHandler.bind(this);
    this._watchedClickHandler = this._watchedClickHandler.bind(this);
    this._favoriteClickHandler = this._favoriteClickHandler.bind(this);
  }

  getTemplate() {
    const {poster, filmName, rating, year, duration, genre, description, comments, isWishList, isWatched, isFavorite} = this._film;

    const isWishListClassName = isWishList ? 'checked' : '';

    const isWatchedListClassName = isWatched ? 'checked' : '';

    const isFavoriteListClassName = isFavorite ? 'checked' : '';

    return `<article class="film-card" data-index="${this._film.index}">
    <h3 class="film-card__title">${filmName}</h3>
    <p class="film-card__rating">${rating}</p>
    <p class="film-card__info">
      <span class="film-card__year">${year}</span>
      <span class="film-card__duration">${duration}</span>
      <span class="film-card__genre">${genre}</span>
    </p>
    <img src=${poster} alt="" class="film-card__poster">
    <p class="film-card__description">${description}</p>
    <a class="film-card__comments">${comments.length}</a>
    <div class="film-card__controls">
      <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist ${isWishListClassName}" type="button">Add to watchlist</button>
      <button class="film-card__controls-item button film-card__controls-item--mark-as-watched ${isWatchedListClassName}" type="button">Mark as watched</button>
      <button class="film-card__controls-item button film-card__controls-item--favorite" type="button ${isFavoriteListClassName}">Mark as favorite</button>
    </div>
  </article>`;
  }

  _clickHandler(evt, film) {
    evt.preventDefault();
    this._callback(film);
  }

  _watchListClickHandler(evt) {
    evt.preventDefault();
    this._callback();
  }

  _watchedClickHandler(evt) {
    evt.preventDefault();
    this._callback();
  }

  _favoriteClickHandler(evt) {
    evt.preventDefault();
    this._callback();
  }

  setClickHandlerPoster(callback) {
    this._callback = callback;
    const poster = this.getElement().querySelector('.film-card__poster');
    poster.addEventListener('click', (e) => this._clickHandler(e, this._film));
  }

  setWatchListClickHandler(callback) {
    this._callback = callback;
    this.getElement().querySelector('.film-card__controls-item--add-to-watchlist').addEventListener('click', this._watchListClickHandler);
  }

  setWatchedClickHandler(callback) {
    this._callback = callback;
    this.getElement().querySelector('.film-card__controls-item--mark-as-watched').addEventListener('click', this._watchedClickHandler);
  }

  setFavoriteClickHandler(callback) {
    this._callback = callback;
    this.getElement().querySelector('.film-card__controls-item--favorite').addEventListener('click', this._favoriteClickHandler);
  }
}

