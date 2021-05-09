// import FilmsListView from '../view/films';
import FilmCardItemView from '../view/film-card';
import FilmPopupView from '../view/film-popup.js';
import { renderElement, remove, RenderPosition} from '../utils.js';


export default class FilmCard {
  constructor(filmListContainer, changeData) {

    this._filmListContainer = filmListContainer;
    this._changeData = changeData;

    this._setEventListeners = this._setEventListeners.bind(this);
  }

  init(film) {
    this._film = film;
    this._newFilmItem = new FilmCardItemView(this._film);
    this._filmPopupComponent = new FilmPopupView(this._film);

    this._renderFilm(film);
  }

  _renderFilm() {
    // this._film = film;
    // debugger

    const filmCardContainer = document.querySelector('.films-list__container');
    // this._newFilmItem = new FilmCardItemView(this._film);
    const template = this._newFilmItem.getElement();
    renderElement(filmCardContainer, template, RenderPosition.BEFOREEND);
    // this._renderedFilmList[this._film.id] = this._newFilmItem;


    this._setEventListeners(this._newFilmItem);

  }

  destroy() {
    remove(this._newFilmItem);
    remove(this._filmPopupComponent);
  }


  _setEventListeners (renderedFilm){
    this._renderedFilm = renderedFilm;
    this._renderedFilm.setClickHandlerPoster((callbackFilm) => {

      this._filmPopupComponent = new FilmPopupView(callbackFilm);
      this._filmPopupComponent.openElement();

      this._filmPopupComponent.setClickHandler(() => {
        this._filmPopupComponent.closeElement();
      });
    });

    renderedFilm.setWatchListClickHandler((renderedFilm) => {
      this._changeData(
        Object.assign(
          {},
          renderedFilm, { isWishList: !renderedFilm.isWishList},
        ),
      );
    },
    );

    renderedFilm.setWatchedClickHandler((renderedFilm) => {
      this._changeData(
        Object.assign(
          {},
          renderedFilm, { isWatched: !renderedFilm.isWatched},
        ),
      );
    },
    );

    renderedFilm.setFavoriteClickHandler((renderedFilm) => {
      this._changeData(
        Object.assign(
          {},
          renderedFilm, { isFavorite: !renderedFilm.isFavorite},
        ),
      );
    },
    );
  }

  _handlerWatchList() {
    this._film.setWatchListClickHandler(() => {
      this._changeData(
        Object.assign(
          {},
          this._film, { isWishList: !this._film.isWishList},
        ),
      );
    },
    );
  }


}
