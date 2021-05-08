import FilmsListView from '../view/films';
import FilmCardItemView from '../view/film-card';
import FilmPopupView from '../view/film-popup.js';
import { renderElement, remove, updateItem, RenderPosition} from '../utils.js';


export default class FilmCard {
  container (filmListContainer, changeData) {

    this._filmListContainer = filmListContainer;
    this._changeData = changeData;
    this._handleFilmChange = this._handleFilmChange.bind(this);
    this._setEventListeners = this._setEventListeners.bind(this);
  }

  init(film) {
    console.log(this._changeData)
    // this._siteListComponent = new FilmsListView(film);
    this._filmPopupComponent = new FilmPopupView(film);

    this._renderFilm(film);
  }

  _renderFilm(film) {
    this._film = film;
    // debugger

    const filmCardContainer = document.querySelector('.films-list__container');
    this._newFilmItem = new FilmCardItemView(this._film);
    const template = this._newFilmItem.getElement();
    renderElement(filmCardContainer, template, RenderPosition.BEFOREEND);
    // this._renderedFilmList[this._film.id] = this._newFilmItem;


    this._setEventListeners(this._newFilmItem);

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

  // renderedFilm.setWatchListClickHandler((renderedFilm) => {
  //   this._changeData(
  //     Object.assign(
  //       {},
  //       renderedFilm, { isWishList: !renderedFilm.isWishList},
  //     ),
  //   );
  // },
  // );

}
