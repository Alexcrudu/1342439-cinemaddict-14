import Observer from '../utils/observer.js';
import {getRandomInteger} from '../utils/functions.js';
import dayjs from 'dayjs';

export default class Films extends Observer {
  constructor() {
    super();
    this._films = [];
  }

  setFilms(films) {
    this._films = films.slice();
  }

  getFilms() {
    return this._films;
  }

  updateFilm (update) {
    const index = this._films.findIndex((film) => film.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t update unexisting film');
    }

    this._films = [
      ...this._films.slice(0, index),
      update,
      ...this._films.slice(index + 1),
    ];

    this._notify(update);
  }

  static adaptFilmToClient(film) {
    const adaptedFilm = Object.assign(
      {},
      film,
      {
        poster: film.film_info.poster,
        filmName: film.film_info.title,
        alternativeFilmName: film.film_info.alternative_title,
        rating: film.film_info.total_rating,
        year: getRandomInteger(10, 20),
        duration: film.film_info.runtime,
        ageRating: film.film_info.age_rating,
        directors: film.film_info.director,
        writers: film.film_info.writers,
        genre: film.film_info.genre,
        description: film.film_info.description,
        actors: film.film_info.actors,
        date: film.film_info.release.date !== null ? new Date(film.film_info.release.date) : film.film_info.release.date,
        country: film.film_info.release.release_country,
        runtime: film.film_info.runtime,
        isWishList: film.user_details.watchlist,
        isFavorite: film.user_details.favorite,
        watched: {
          already_watched: film.user_details.already_watched,
          watching_date: dayjs(film.user_details.watching_date).format,
        },
      },
    );

    delete adaptedFilm.film_info;
    delete adaptedFilm.user_details;

    return adaptedFilm;
  }


  static adaptFilmToServer (film) {
    const adaptedFilm = Object.assign(
      {},
      film,
      {
        'comments': film.comments.map((comment) => comment.id),
        'film_info': {
          'title': film.filmName,
          'alternative_title': film.alternativeFilmName,
          'total_rating': film.rating,
          'poster': film.poster,
          'age_rating': film.ageRating,
          'director': film.directors,
          'writers': film.writers,
          'actors': film.actors,
          'release': {
            'date': film.date.toISOString(),
            'release_country': film.country,
          },
          'runtime': film.runtime,
          'genre': film.genre,
          'description': film.description,
        },

        'user_details': {
          'watchlist': film.isWishList,
          'already_watched': film.watched.already_watched,
          'watching_date': film.watching_date instanceof Date ? film.watching_date.toISOString() : null,
          'favorite': film.isFavorite,
        },
      },
    );

    delete adaptedFilm.title;
    delete adaptedFilm.alternativeFilmName;
    delete adaptedFilm.rating;
    delete adaptedFilm.poster;
    delete adaptedFilm.ageRating;
    delete adaptedFilm.directors;
    delete adaptedFilm.writers;
    delete adaptedFilm.actors;
    delete adaptedFilm.date;
    delete adaptedFilm.coutry;
    delete adaptedFilm.runtime;
    delete adaptedFilm.genre;
    delete adaptedFilm.description;
    delete adaptedFilm.isWishList;
    delete adaptedFilm.watched;
    delete adaptedFilm.isFavorite;

    return adaptedFilm;
  }
}
