import AbstractView from './abstract.js';
import {SortType} from '../const.js';

export default class MainSort extends AbstractView {
  constructor() {
    super();

    this._sortTypeChangeHandler = this._sortTypeChangeHandler.bind(this);
  }

  getTemplate() {
    return `<ul class="sort">
    <li><a href="#" class="sort__button sort__button--active" data-sort-type="${SortType.DEFAULT}">Sort by default</a></li>
    <li><a href="#" class="sort__button" data-sort-type="${SortType.DATE}">Sort by date</a></li>
    <li><a href="#" class="sort__button" data-sort-type="${SortType.RATING}">Sort by rating</a></li>
    </ul>`;
  }


  _sortTypeChangeHandler(evt) {
    if (evt.target.tagName !== 'A') {
      return;
    }

    const activeSort = document.querySelector('.sort__button--active');

    evt.preventDefault();
    this._callback(evt.target.dataset.sortType);
    activeSort.classList.remove('sort__button--active');
    evt.target.classList.add('sort__button--active');
  }

  setSortTypeChangeHandler(callback) {
    this._callback = callback;
    this.getElement().addEventListener('click', this._sortTypeChangeHandler);
  }
}

