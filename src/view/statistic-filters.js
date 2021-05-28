import AbstractView from './abstract.js';
import { StatFilters } from '../const.js';

const createStatisticFiltersTemplate = () => {
  return `<form action="https://echo.htmlacademy.ru/" method="get" class="statistic__filters">
  <p class="statistic__filters-description">Show stats:</p>
  <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-all-time" value="all-time" checked>
  <label for="statistic-all-time" class="statistic__filters-label" data-stat-filter="${StatFilters.ALL}">All time</label>
  <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-today" value="today">
  <label for="statistic-today" class="statistic__filters-label" data-stat-filter="${StatFilters.TODAY}">Today</label>
  <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-week" value="week">
  <label for="statistic-week" class="statistic__filters-label" data-stat-filter="${StatFilters.WEEK}">Week</label>
  <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-month" value="month">
  <label for="statistic-month" class="statistic__filters-label" data-stat-filter="${StatFilters.MONTH}">Month</label>
  <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-year" value="year">
  <label for="statistic-year" class="statistic__filters-label" data-stat-filter="${StatFilters.YEAR}">Year</label>
</form>`;
};


export default class StatisticFilters extends AbstractView {
  constructor() {
    super();
    this._statFiltersChangeHandler = this._statFiltersChangeHandler.bind(this);
  }

  getTemplate() {
    return createStatisticFiltersTemplate();
  }

  _statFiltersChangeHandler(evt) {
    if (evt.target.tagName === 'LABEL') {
      evt.preventDefault();

      const hiddenInputId = evt.target.attributes['for'];
      const hiddenInput = document.getElementById(hiddenInputId.value);
      hiddenInput.checked = true;

      this._callback(evt.target.dataset.statFilter);
    }
  }

  setStatFilterChangeHandler(callback) {
    this._callback = callback;
    this.getElement().addEventListener('click', this._statFiltersChangeHandler);
  }

}
