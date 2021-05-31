import AbstractView from './abstract.js';
export default class AllFilms extends AbstractView {
  constructor(films) {
    super();

    this._films = films;
  }
  getTemplate() {
    return  `<section class="footer__statistics">
    <p>${this._films.length} movies inside</p>
  </section>`;
  }
}
