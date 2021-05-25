import FilmCardItemView from '../view/film-card';
import FilmPopupView from '../view/film-popup.js';
import { generateCommentMock } from '../mock/comments.js';
import CommentsModel from '../model/comments-model.js';
import { renderElement, remove, RenderPosition, getRandomInteger} from '../utils/functions.js';
// import {UpdateType } from '../const.js';

const MAX_COMMENTS = 10;
const RANDOM_COMMENTS = new Array(getRandomInteger(1, MAX_COMMENTS)).fill().map(generateCommentMock);
const commentsModel = new CommentsModel();
commentsModel.setComments(RANDOM_COMMENTS);


export default class FilmCard {
  constructor(filmListContainer, changeData) {
    this._filmListContainer = filmListContainer;
    this._changeData = changeData;

    this._setEventListeners = this._setEventListeners.bind(this);
    this._handleCommentAddClick = this._handleCommentAddClick.bind(this);
  }

  init(container, film) {
    this._comments = commentsModel;
    this._film = film;
    this._film.comments = commentsModel.getComments();
    this._newFilmItem = new FilmCardItemView(this._film);
    this._filmPopupComponent = new FilmPopupView(this._film, this._comments._comments);

    this._renderFilm(container);
  }

  // _getComments() {
  //   return this._comments.getComments().slice(0, getRandomInteger(0, MAX_COMMENTS));
  // }

  _renderFilm(container) {
    const template = this._newFilmItem.getElement();
    renderElement(container, template, RenderPosition.BEFOREEND);

    this._setEventListeners(this._newFilmItem);
    this._setPopupListeners(this._newFilmItem);
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

    // this._filmPopupComponent.setWatchListClickHandler((renderedFilm) => {
    //   this._handlerWishList(renderedFilm);
    // },
    // );

    // this._filmPopupComponent.setWatchedClickHandler((renderedFilm) => {
    //   this._handlerWatched(renderedFilm);
    // },
    // );

    // this._filmPopupComponent.setFavoriteClickHandler((renderedFilm) => {
    //   this._handlerFavorite(renderedFilm);
    // },
    // );

    // this._filmPopupComponent.setCommentAddClickHandler(this._handleCommentAddClick);

    // this._filmPopupComponent.setDeleteHandler((comment) => {
    //   this._film.comments = this._comments.deleteComment(comment, this._filmComments);
    //   this._filmPopupComponent.updateComments(this._film.comments);
    // });

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

  _setPopupListeners (renderedFilm) {
    this._renderedFilm = renderedFilm;
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
      this._comments.deleteComment(comment, this._filmComments);
      this._film.comments = this._comments.getComments();
      this._filmPopupComponent.updateComments(this._film.comments);
      this._resetListeners();
    });
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

  _resetListeners () {
    this._setPopupListeners(this._newFilmItem);
  }
}
