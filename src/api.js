import FilmsModel from './model/films-model.js';
import CommentsModel from './model/comments-model.js';

const Method = {
  GET: 'GET',
  PUT: 'PUT',
};

const SuccessHTTPStatusRange = {
  MIN: 200,
  MAX: 299,
};

export default class Api {
  constructor(endPoint, authorization) {
    this._endPoint = endPoint;
    this._authorization = authorization;
  }

  getFilms() {
    return this._load({url: 'movies'})
      .then(Api.toJSON)
      .then((films) => {
        return films.map(FilmsModel.adaptFilmToClient);},
      )
      .catch(() => {
        throw new Error('Film is mandatory');
      });
  }


  updateFilm(film) {
    const adapted = FilmsModel.adaptFilmToServer(film);
    const body = JSON.stringify(adapted);

    return this._load({
      url: `movies/${adapted.id}`,
      method: Method.PUT,
      body,
      headers: new Headers({'Content-Type': 'application/json'}),
    })
      .then(Api.toJSON)
      .then(FilmsModel.adaptToClient);
  }

  getComments(filmId) {
    if (!filmId) throw new Error('Film ID is mandatory');
    else {
      return this._load({url: `comments/${filmId}`})
        .then(Api.toJSON)
        .then((comments) => {
          const normalizeComments = CommentsModel.adaptCommentToClient(comments);

          return normalizeComments;
        });
    }

  }

  _load({
    url,
    method = Method.GET,
    body = null,
    headers = new Headers(),
  }) {
    headers.append('Authorization', this._authorization);

    return fetch(
      `${this._endPoint}/${url}`,
      {method, body, headers},
    )
      .then(Api.checkStatus)
      .catch(Api.catchError);
  }

  static checkStatus(response) {
    if (
      response.status < SuccessHTTPStatusRange.MIN ||
      response.status > SuccessHTTPStatusRange.MAX
    ) {
      throw new Error(`${response.status}: ${response.statusText}`);
    }

    return response;
  }

  static toJSON(response) {
    return response.json();
  }

  static catchError(err) {
    throw err;
  }
}
