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
import {generateFilmCard} from './mock/film-card';
// import {generateFilmComments} from './mock/comments.js';
import {renderElement} from './utils.js';
import FilmPopup from './view/film-popup.js';

const FILMS_COUNT = 22;
const FILMS_COUNT_PER_STEP = 5;

const films = new Array(FILMS_COUNT).fill().map(generateFilmCard);

const siteHeader = document.querySelector('.header');

renderElement(siteHeader, new UserNameView().getElement());

const siteMain = document.querySelector('.main');

renderElement(siteMain, new SiteMenuView().getElement(films));
renderElement(siteMain, new MainSort().getElement());
renderElement(siteMain, new FilmsList().getElement());

const filmsList = siteMain.querySelector('.films');
const filmCardContainer = filmsList.querySelector('.films-list__container');

for(let i=0; i< Math.min(films.length, FILMS_COUNT_PER_STEP); i++) {
  films[i].index = i;
  const newFilmItem =new FilmCardItem().getElement(films[i]);
  renderElement(filmCardContainer, newFilmItem);
}

if (films.length > FILMS_COUNT_PER_STEP) {
  let renderedFilmCount = FILMS_COUNT_PER_STEP;
  const showMoreButton = new ShowMoreFilmsButton().getElement();

  renderElement(filmsList, showMoreButton);


  showMoreButton.addEventListener('click', (evt) => {
    evt.preventDefault();

    films.slice(renderedFilmCount, renderedFilmCount + FILMS_COUNT_PER_STEP).forEach((film, index) => {
      film.index = index;
      renderElement(filmCardContainer, new FilmCardItem().getElement(film));
    });

    renderedFilmCount += FILMS_COUNT_PER_STEP;

    if (renderedFilmCount >= films.length) {
      showMoreButton.remove();
    }
  });
}

renderElement(siteMain, new TopRated().getElement);
renderElement(siteMain, new MostCommented().getElement());

const siteBody = document.querySelector('body');

const filmItems = Array.from(filmCardContainer.querySelectorAll('.film-card'));

// const renderPopup = (item) => {
//   renderElement(siteBody,new FilmPopup().getElement(item));
// };

filmItems.forEach((film, index) => {
  film.dataset.index= index;

  // const renderPopup = renderElement(siteBody,new FilmPopup().getElement(films[index]));

  film.addEventListener('click', (evt) => {
    evt.preventDefault();
    renderElement(siteBody,new FilmPopup().getElement(films[index]));

    const filmPopup = siteBody.querySelector('.film-details');


    const closePopUpButton = filmPopup.querySelector('.film-details__close-btn');

    closePopUpButton.addEventListener('click', (evt) => {
      evt.preventDefault();
      filmPopup.remove();
    });
  });

});


// for(let i=0; i< FILMS_COUNT; i++) {
//   render(siteBody, createFilmDetailsPopupTemplate(films[i]), 'beforeend');
// }


const siteFooter = document.querySelector('.footer');

renderElement(siteFooter, new AllFilmsView().getElement());
