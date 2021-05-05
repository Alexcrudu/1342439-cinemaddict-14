import FilmCardItemView from '../view/film-card';
import FilmPopupView from '../view/film-popup.js';
import { renderElement} from '../utils.js';

export default class Film {
  constructor(filmContainer) {
    this._filmContainer = filmContainer;

    this._filmComponent = null;
  }

  init(film, films) {
    this._film = film;
    this._films = films;

    this._filmComponent = new FilmCardItemView(this._film);

    renderElement(this._filmContainer, this._filmComponent.getElement());
    this._setEventListeners(this._filmComponent);
  }


  _setEventListeners(renderedFilm){
    renderedFilm.setClickHandlerPoster((callbackFilm) => {
      this._filmPopupComponent = new FilmPopupView(callbackFilm);
      this._filmPopupComponent.openElement();

      this._filmPopupComponent.setClickHandler(() => {
        this._filmPopupComponent.closeElement();
      });
    });

    renderedFilm.setWatchListClickHandler(() => {
      const filmIndex = this._films.findIndex((film) => film.id === this._film.id);
      const currentFilm = this._films[filmIndex];
      currentFilm.isWishList = !currentFilm.isWishList;
    });
  }
}
