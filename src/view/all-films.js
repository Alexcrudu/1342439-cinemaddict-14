import {createElement} from '../utils.js';

export default class AllFilms {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return  `<section class="footer__statistics">
    <p>130 291 movies inside</p>
  </section>`;
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }
    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
