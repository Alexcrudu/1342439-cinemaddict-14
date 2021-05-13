import FilmCardItemView from '../view/film-card';
import FilmPopupView from '../view/film-popup.js';
import { renderElement, remove, RenderPosition} from '../utils.js';


export default class FilmCard {
  constructor(filmListContainer, changeData) {
    this._filmListContainer = filmListContainer;
    this._changeData = changeData;

    this._setEventListeners = this._setEventListeners.bind(this);
  }

  init(container, film) {
    this._film = film;
    this._newFilmItem = new FilmCardItemView(this._film);
    this._filmPopupComponent = new FilmPopupView(this._film);

    this._renderFilm(container);
  }

  _renderFilm(container) {
    const template = this._newFilmItem.getElement();
    renderElement(container, template, RenderPosition.BEFOREEND);

    this._setEventListeners(this._newFilmItem);
  }

  destroy() {
    remove(this._newFilmItem);
  }


  _setEventListeners (renderedFilm){
    this._renderedFilm = renderedFilm;
    this._renderedFilm.setClickHandlerPoster(() => {

      this._filmPopupComponent.openElement();

      this._filmPopupComponent.setClickHandler(() => {
        this._filmPopupComponent.closeElement();
      });

      this._filmPopupComponent.setWatchListClickHandler((renderedFilm) => {
        this._handlerWishList(renderedFilm);
      },
      );


      this._filmPopupComponent.setWatchedClickHandler((renderedFilm) => {
        this._handlerWatched(renderedFilm);
      });

      this._filmPopupComponent.setFavoriteClickHandler((renderedFilm) => {
        this._handlerFavorite(renderedFilm);
      });

    });

    renderedFilm.setWatchListClickHandler((renderedFilm) => {
      this._handlerWishList(renderedFilm);
    },
    );

    renderedFilm.setWatchedClickHandler((renderedFilm) => {
      this._handlerWatched(renderedFilm);
    },
    );

    renderedFilm.setFavoriteClickHandler((renderedFilm) => {
      this._handlerFavorite(renderedFilm);
    },
    );
  }

  _handlerWishList(film) {
    this._changeData(
      Object.assign(
        {},
        film, { isWishList: !film.isWishList},
      ),
    );
  }

  _handlerWatched(film) {
    this._changeData(
      Object.assign(
        {},
        film, { isWatched: !film.isWatched},
      ),
    );
  }

  _handlerFavorite(film) {
    this._changeData(
      Object.assign(
        {},
        film, { isFavorite: !film.isFavorite},
      ),
    );
  }

}
