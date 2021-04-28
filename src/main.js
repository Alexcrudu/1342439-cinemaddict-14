import UserNameView from './view/username.js';
import SiteMenuView from './view/main-navigation';
import MainSort from './view/sort';
import FilmsList from './view/films';
import ShowMoreFilmsButton from './view/show-more-button';
import TopRated from './view/top-rated-films';
import MostCommented from './view/most-commented-films';
// import FilmPopup from './view/film-popup';
import AllFilmsView from './view/all-films';
import FilmCardItem from './view/film-card';
import { generateFilmCard } from './mock/film-card';
// import {generateFilmComments} from './mock/comments.js';
import { renderElement } from './utils.js';
import FilmPopup from './view/film-popup.js';
import NoFilms from './view/no-films.js';

const FILMS_COUNT = 22;
const FILMS_COUNT_PER_STEP = 5;
const ESC = 'Escape';
const siteBody = document.querySelector('body');

const films = new Array(FILMS_COUNT).fill().map(generateFilmCard);

const siteHeader = document.querySelector('.header');

renderElement(siteHeader, new UserNameView().getElement());

const siteMain = document.querySelector('.main');

renderElement(siteMain, new SiteMenuView(films).getElement());
renderElement(siteMain, new MainSort().getElement());
renderElement(siteMain, new FilmsList().getElement());

if (films.length === 0) {
  renderElement(siteMain, new NoFilms().getElement());
}

const filmsList = siteMain.querySelector('.films');
const filmCardContainer = filmsList.querySelector('.films-list__container');

for (let i = 0; i < Math.min(films.length, FILMS_COUNT_PER_STEP); i++) {
  films[i].index = i;
  const newFilmItem = new FilmCardItem(films[i]);
  renderElement(filmCardContainer, newFilmItem.getElement());

  const filmPopupClass = new FilmPopup(films[i]);

  newFilmItem.setClickHandler(() => {
    filmPopupClass.openElement(siteBody);

    filmPopupClass.setClickHandler(() => {
      filmPopupClass.closeElement(siteBody);
    });

    siteBody.addEventListener('keydown', (evt) => {
      if (evt.key === ESC) {
        filmPopupClass.closeElement(siteBody);
      }
    });
  });

}

if (films.length > FILMS_COUNT_PER_STEP) {
  let renderedFilmCount = FILMS_COUNT_PER_STEP;
  const showMoreButton = new ShowMoreFilmsButton();
  renderElement(filmsList, showMoreButton.getElement());

  showMoreButton.setClickHandler(() => {

    films
      .slice(renderedFilmCount, renderedFilmCount + FILMS_COUNT_PER_STEP)
      .forEach((film, index) => {
        film.index = index;
        const showMoreNewFilmItem = new FilmCardItem(film);
        renderElement(filmCardContainer, showMoreNewFilmItem.getElement());

        showMoreNewFilmItem.setClickHandler(() => {
          const filmPopupClass = new FilmPopup(film);
          filmPopupClass.openElement(siteBody);

          filmPopupClass.setClickHandler(() => {
            filmPopupClass.closeElement(siteBody);
          });

          siteBody.addEventListener('keydown', (evt) => {
            if (evt.key === ESC) {
              filmPopupClass.closeElement(siteBody);
            }
          });
        });
      });

    renderedFilmCount += FILMS_COUNT_PER_STEP;

    if (renderedFilmCount >= films.length) {
      showMoreButton.remove();
    }
  });
}

renderElement(siteMain, new TopRated().getElement());
renderElement(siteMain, new MostCommented().getElement());

const siteFooter = document.querySelector('.footer');

renderElement(siteFooter, new AllFilmsView().getElement());
