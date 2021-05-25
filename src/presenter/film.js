import FilmCardItemView from '../view/film-card';
import FilmPopupView from '../view/film-popup.js';
import { renderElement, remove, RenderPosition, getRandomInteger} from '../utils/functions.js';
// import {UpdateType } from '../const.js';

const MAX_COMMENTS = 10;


export default class FilmCard {
  constructor(filmListContainer, changeData) {
    this._filmListContainer = filmListContainer;
    this._changeData = changeData;

    this._setEventListeners = this._setEventListeners.bind(this);
    this._handleCommentAddClick = this._handleCommentAddClick.bind(this);
  }

  init(container, film, comments) {
    this._comments = comments;
    this._film = film;
    this._filmComments = this._getComments();
    this._film.comments = this._filmComments;
    this._newFilmItem = new FilmCardItemView(this._film);
    this._filmPopupComponent = new FilmPopupView(this._film, this._comments);

    this._renderFilm(container);
  }

  _getComments() {
    return this._comments.getComments().slice(0, getRandomInteger(0, MAX_COMMENTS));
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
        remove(this._filmPopupComponent);
      });

    });

    this._filmPopupComponent.setWatchListClickHandler((renderedFilm) => {
      this._handlerWishList(renderedFilm);
    },
    );

    this._filmPopupComponent.setWatchedClickHandler((renderedFilm) => {
      this._handlerWatched(renderedFilm);
    },
    );

    this._filmPopupComponent.setFavoriteClickHandler((renderedFilm) => {
      this._handlerFavorite(renderedFilm);
    },
    );

    this._filmPopupComponent.setCommentAddClickHandler(this._handleCommentAddClick);

    this._filmPopupComponent.setDeleteHandler((comment) => {
      this._film.comments = this._comments.deleteComment(comment, this._filmComments);
      this._filmPopupComponent.updateComments(this._filmComments);
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

  _handleCommentAddClick(comment) {
    const existingComments = this._film.comments;
    existingComments.push(comment);
    const newObject = Object.assign(
      {},
      this._film,
      {
        comments: existingComments,
      },
    );

    this._changeData(
      newObject,
    );

    this._filmPopupComponent.updateComments(newObject.comments);
  }


  _handlerWishList(film) {
    this._film.isWishList = !this._film.isWishList;
    this._changeData(film);
  }

  _handlerWatched(film) {
    this._film.isWatched = !this._film.isWatched;
    this._changeData(film);
  }

  _handlerFavorite(film) {
    this._film.isFavorite = !this._film.isFavorite;
    this._changeData(film);
  }
}
