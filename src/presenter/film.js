import FilmCardItemView from '../view/film-card';
import FilmPopupView from '../view/film-popup.js';
// import { generateCommentMock } from '../mock/comments.js';
import CommentsModel from '../model/comments-model.js';
import { renderElement, remove, RenderPosition, getUtcDateNow} from '../utils/functions.js';
import Api from '../api.js';

// const MAX_COMMENTS = 10;
// const RANDOM_COMMENTS = new Array(getRandomInteger(1, MAX_COMMENTS)).fill().map(generateCommentMock);
const commentsModel = new CommentsModel();
const AUTHORIZATION = 'Basic QWERT%$#@!!@#$%TREWQ';
const END_POINT = 'https://14.ecmascript.pages.academy/cinemaddict';
const api = new Api(END_POINT, AUTHORIZATION);
// commentsModel.setComments(RANDOM_COMMENTS);


export default class FilmCard {
  constructor(filmListContainer, changeData) {
    this._filmListContainer = filmListContainer;
    this._changeData = changeData;


    this._setEventListeners = this._setEventListeners.bind(this);
    this._handleCommentAddClick = this._handleCommentAddClick.bind(this);
  }

  init(container, film) {

    this._film = film;
    this._film.commentsLength = film.comments.length;
    this._film.comments = [];
    this._newFilmItem = new FilmCardItemView(this._film);
    this._filmPopupComponent = new FilmPopupView(this._film);
    this._renderFilm(container);
  }

  _renderFilm(container) {
    const template = this._newFilmItem.getElement();
    renderElement(container, template, RenderPosition.BEFOREEND);

    this._setEventListeners(this._newFilmItem);
    this._setPopupListeners(this._newFilmItem);
  }

  destroy() {
    remove(this._newFilmItem);
  }

  _setUpModal(comments) {
    this._comments = commentsModel;
    this._comments.setComments(comments);

    this._film.comments = commentsModel.getComments();
    this._filmPopupComponent.updateComments(this._film.comments);
    this._filmPopupComponent.openElement();
  }


  _setEventListeners (renderedFilm){
    this._renderedFilm = renderedFilm;
    this._renderedFilm.setClickHandlerPoster(() => {
      api.getComments(this._film.id)
        .then((comments) => {
          this._setUpModal(comments);
          this._resetListeners();
        },
        );


      this._filmPopupComponent.setClickHandler(() => {
        remove(this._filmPopupComponent);
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


    this._filmPopupComponent.setDeleteHandler((id) => {
      this._comments.deleteComment(id);
      this._film.comments = this._comments.getComments();
      this._filmPopupComponent.updateComments(this._film.comments);
      this._resetListeners();
    });


    //this._filmPopupComponent.setCommentAddClickHandler(this._handleCommentAddClick);
  }

  _handleCommentAddClick(comment) {
    this._film.comments.push(comment);

    this._filmPopupComponent.updateComments(this._film.comments);
  }


  _handlerWishList(film) {
    this._film.isWishList = !this._film.isWishList;
    this._changeData(film);
  }

  _handlerWatched(film) {
    this._film.watched.already_watched = !this._film.watched.already_watched;
    this._film.watched.watching_date = this._film.watched.already_watched ? '' : getUtcDateNow();
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
