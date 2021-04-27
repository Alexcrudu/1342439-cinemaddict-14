import AbstractView from './abstract.js';
export default class AllFilms extends AbstractView {
  getTemplate() {
    return  `<section class="footer__statistics">
    <p>130 291 movies inside</p>
  </section>`;
  }
}
