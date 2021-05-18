import SmartView from './smart.js';

export default class FilmPopup extends SmartView {
  constructor(film) {
    super();
    this._data = film;
    this._eventHandler = this._eventHandler.bind(this);
    this._container = document.querySelector('body');
    this._commentEmojiClickHandler = this._commentEmojiClickHandler.bind(this);
    this.setCommentEmojiClickHandler();
  }


  getTemplate() {
    const {poster, filmName, alternativeFilmName, ageRating, directors, writers, actors, date, country, rating, duration, description, comments, isWishList, isWatched, isFavorite, newCommentEmoji = ''} = this._data;
    const isWishListChecked = isWishList ? 'checked' : '';

    const isWatchedListChecked = isWatched ? 'checked' : '';

    const isFavoriteListChecked = isFavorite ? 'checked' : '';

    const getNewCommentEmoji = (newCommentEmoji) => {
      if(newCommentEmoji!== '') {
        return `<img src="${newCommentEmoji}" width="55" height="55" alt="emoji">`;
      } else {
        return '';
      }
    };

    return `<section class="film-details">
  <form class="film-details__inner" action="" method="get">
    <div class="film-details__top-container">
      <div class="film-details__close">
        <button class="film-details__close-btn" type="button">close</button>
      </div>
      <div class="film-details__info-wrap">
        <div class="film-details__poster">
          <img class="film-details__poster-img" src=${poster} alt="">

          <p class="film-details__age">${ageRating}+</p>
        </div>

        <div class="film-details__info">
          <div class="film-details__info-head">
            <div class="film-details__title-wrap">
              <h3 class="film-details__title">${filmName}</h3>
              <p class="film-details__title-original">${alternativeFilmName}</p>
            </div>

            <div class="film-details__rating">
              <p class="film-details__total-rating">${rating}</p>
            </div>
          </div>

          <table class="film-details__table">
            <tr class="film-details__row">
              <td class="film-details__term">Director</td>
              <td class="film-details__cell">${directors}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Writers</td>
              <td class="film-details__cell">${writers}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Actors</td>
              <td class="film-details__cell">${actors.join(', ')}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Release Date</td>
              <td class="film-details__cell">${date}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Runtime</td>
              <td class="film-details__cell">${duration}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Country</td>
              <td class="film-details__cell">${country}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Genres</td>
              <td class="film-details__cell">
                <span class="film-details__genre">Drama</span>
                <span class="film-details__genre">Film-Noir</span>
                <span class="film-details__genre">Mystery</span></td>
            </tr>
          </table>

          <p class="film-details__film-description">
            ${description}
          </p>
        </div>
      </div>

      <section class="film-details__controls">
        <input type="checkbox" class="film-details__control-input film-details__control-input--watchlist visually-hidden" id="watchlist" name="watchlist" ${isWishListChecked}>
        <label for="watchlist" class="film-details__control-label film-details__control-label--watchlist">Add to watchlist</label>

        <input type="checkbox" class="film-details__control-input film-details__control-input--watched visually-hidden" id="watched" name="watched" ${isWatchedListChecked}>
        <label for="watched" class="film-details__control-label film-details__control-label--watched">Already watched</label>

        <input type="checkbox" class="film-details__control-input film-details__control-input--favorite visually-hidden" id="favorite" name="favorite" ${isFavoriteListChecked}>
        <label for="favorite" class="film-details__control-label film-details__control-label--favorite">Add to favorites</label>
      </section>
    </div>

    <div class="film-details__bottom-container">
      <section class="film-details__comments-wrap">
        <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${comments.length}</span></h3>

        <ul class="film-details__comments-list">

          ${this._getCommentTemplate(comments)}
        </ul>

        <div class="film-details__new-comment">
          <div class="film-details__add-emoji-label">${getNewCommentEmoji(newCommentEmoji)}</div>

          <label class="film-details__comment-label">
            <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment"></textarea>
          </label>

          <div class="film-details__emoji-list">
            <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-smile" value="smile">
            <label class="film-details__emoji-label" for="emoji-smile">
              <img src="./images/emoji/smile.png" width="30" height="30" alt="emoji">
            </label>

            <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-sleeping" value="sleeping">
            <label class="film-details__emoji-label" for="emoji-sleeping">
              <img src="./images/emoji/sleeping.png" width="30" height="30" alt="emoji">
            </label>

            <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-puke" value="puke">
            <label class="film-details__emoji-label" for="emoji-puke">
              <img src="./images/emoji/puke.png" width="30" height="30" alt="emoji">
            </label>

            <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-angry" value="angry">
            <label class="film-details__emoji-label" for="emoji-angry">
              <img src="./images/emoji/angry.png" width="30" height="30" alt="emoji">
            </label>
          </div>
        </div>
      </section>
    </div>
  </form>
</section>`;
  }

  _getCommentTemplate (comments) {
    return comments.map((comment) => {
      return `<li class="film-details__comment">
      <span class="film-details__comment-emoji">
        <img src="./images/emoji/${comment.emoji}.png" width="55" height="55" alt="emoji-smile">
      </span>
      <div>
        <p class="film-details__comment-text">${comment.text}</p>
        <p class="film-details__comment-info">
          <span class="film-details__comment-author">Tim Macoveev</span>
          <span class="film-details__comment-day">${comment.date} </span>
          <button data-id = "${comment.id}"class="film-details__comment-delete">Delete</button>
        </p>
      </div>
    </li>`;
    });

  }


  _eventHandler(evt, callback) {
    evt.preventDefault();
    if (evt.key === 'Escape') {
      callback(this._data);
    }
  }

  setClickHandler(callback) {
    this._callback = callback;
    const closeButton = this.getElement().querySelector('.film-details__close-btn');
    closeButton.addEventListener('click', (e) => this._clickHandler(e, callback));
    this._container.addEventListener('keydown', (e) => this._eventHandler(e, callback));
  }

  _clickHandler(evt, callback) {
    evt.preventDefault();
    callback(this._data);
  }


  openElement() {
    this._container.appendChild(this.getElement());
  }

  closeElement() {
    const element = this.getElement();
    this._container.removeChild(element);
    this._container.removeEventListener('keydown', this._eventHandler);
  }

  setWatchListClickHandler(callback) {
    this._callback = callback;
    const watchList = this.getElement().querySelector('.film-details__control-input--watchlist');
    watchList.addEventListener('change', (e) => this._clickHandler(e, callback));
  }

  setWatchedClickHandler(callback) {
    this._callback = callback;
    const watchedFilm = this.getElement().querySelector('.film-details__control-input--watched');
    watchedFilm.addEventListener('change', (e) => this._clickHandler(e, callback));
  }

  setFavoriteClickHandler(callback) {
    this._callback = callback;
    const favorite = this.getElement().querySelector('.film-details__control-input--favorite');
    favorite.addEventListener('change', (e) => this._clickHandler(e, callback));
  }


  _commentEmojiClickHandler(evt) {
    evt.preventDefault();
    if(evt.target.tagName === 'IMG') {
      this.updateData(
        Object.assign(
          {},
          this._data,
          {
            newCommentEmoji: evt.target.src,
          },
        ), false,
      );

      const inputHiddenId = evt.target.parentElement.attributes['for'];
      const inputHidden = document.getElementById(inputHiddenId.value);
      inputHidden.checked = true;
    }

    const newCommentEmoji = document.querySelector('.film-details__add-emoji-label');
    if(newCommentEmoji !== null) {
      newCommentEmoji.scrollIntoView();
    }
  }

  setCommentEmojiClickHandler(callback) {
    this._callback = callback;

    const newCommentEmoji = this.getElement().querySelector('.film-details__emoji-list');

    if(newCommentEmoji !==null) {
      newCommentEmoji.addEventListener('click', this._commentEmojiClickHandler);
    }
  }

  restoreHandlers() {
    this.setClickHandler(this._callback);
    this.setCommentEmojiClickHandler(this._callback);
    this.setWatchedClickHandler(this._callback);
    this.setWatchListClickHandler(this._callback);
    this.setFavoriteClickHandler(this._callback);
  }

}
