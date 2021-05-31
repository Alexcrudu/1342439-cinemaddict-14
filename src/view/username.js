import AbstractView from './abstract.js';


const createTemplate = (raiting) => {
  return `<section class="header__profile profile">
    <p class="profile__rating">${raiting}</p>
    <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
  </section>`;
};

export default class UserName extends AbstractView {
  constructor(raiting) {
    super();
    this._raiting = raiting;
  }

  getTemplate() {
    return createTemplate(this._raiting);
  }
}
