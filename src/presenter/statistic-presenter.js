import { getFilmsStatSorted, renderElement, RenderPosition, remove, getProfileRating } from '../utils/functions.js';
import { StatFilters } from '../const.js';


import StatisticsView from '../view/statistic.js';
import StatisticFiltersView from '../view/statistic-filters.js';
import StatisticRankView from '../view/statistic-rank.js';
import StatisticSectionView from '../view/statistic-section.js';
import StatisticTextView from '../view/statistic-text.js';

export default class Statistic {
  constructor(statisticContainer) {
    this._statisticContainer = statisticContainer;

    this._handleStatFilterChange = this._handleStatFilterChange.bind(this);
  }

  init(films) {
    this._films = films;

    this._statisticSectionViewComponent = new StatisticSectionView();
    renderElement(
      this._statisticContainer,
      this._statisticSectionViewComponent.getElement(),
      RenderPosition.BEFOREEND,
    );
    const watchedFilmsCount = this._films.filter((film) => film.watched.already_watched).length;
    this._statisticRankViewComponent = new StatisticRankView(getProfileRating(watchedFilmsCount));
    renderElement(
      this._statisticSectionViewComponent.getElement(),
      this._statisticRankViewComponent.getElement(),
      RenderPosition.BEFOREEND,
    );

    this._statisticFiltersViewComponent = new StatisticFiltersView();
    renderElement(
      this._statisticSectionViewComponent.getElement(),
      this._statisticFiltersViewComponent.getElement(),
      RenderPosition.BEFOREEND,
    );

    this._statisticTextViewComponent = new StatisticTextView(films);
    renderElement(
      this._statisticSectionViewComponent.getElement(),
      this._statisticTextViewComponent.getElement(),
      RenderPosition.BEFOREEND,
    );

    this._statisticsViewComponent = new StatisticsView(films);
    renderElement(
      this._statisticSectionViewComponent.getElement(),
      this._statisticsViewComponent.getElement(),
      RenderPosition.BEFOREEND,
    );
    this._statisticFiltersViewComponent.setStatFilterChangeHandler(
      this._handleStatFilterChange,
    );
  }

  removeStatistic () {
    this._statisticSectionViewComponent.hide();
    this._statisticRankViewComponent.hide;
    this._statisticFiltersViewComponent.hide();
    this._statisticsViewComponent.hide();
    this._statisticTextViewComponent.hide();
  }


  _renderStatisticsData(films) {
    this._statisticsViewComponent = new StatisticsView(films);
    renderElement(this._statisticSectionViewComponent.getElement(), this._statisticsViewComponent.getElement(), RenderPosition.BEFOREEND);
  }

  _renderStatisticText(films) {
    this._statisticTextViewComponent = new StatisticTextView(films);
    renderElement(this._statisticSectionViewComponent.getElement(), this._statisticTextViewComponent.getElement(), RenderPosition.BEFOREEND);
  }

  _handleStatFilterChange(statFilter) {
    const films = this._films;
    let filmStatSorted = [];

    remove(this._statisticsViewComponent);
    remove(this._statisticTextViewComponent);
    switch (statFilter) {
      case StatFilters.ALL:
        this._renderStatisticText(films);
        this._renderStatisticsData(films);
        break;
      case StatFilters.TODAY:
        filmStatSorted = getFilmsStatSorted(films, StatFilters.TODAY);
        this._renderStatisticText(filmStatSorted);
        this._renderStatisticsData(filmStatSorted);
        break;
      case StatFilters.WEEK:
        filmStatSorted = getFilmsStatSorted(films, StatFilters.WEEK);
        this._renderStatisticText(filmStatSorted);
        this._renderStatisticsData(filmStatSorted);
        break;
      case StatFilters.MONTH:
        filmStatSorted = getFilmsStatSorted(films, StatFilters.MONTH);
        this._renderStatisticText(filmStatSorted);
        this._renderStatisticsData(filmStatSorted);
        break;
      case StatFilters.YEAR:
        filmStatSorted = getFilmsStatSorted(films, StatFilters.YEAR);
        this._renderStatisticText(filmStatSorted);
        this._renderStatisticsData(filmStatSorted);
        break;
    }
  }

  destroy(){
    remove(this._statisticSectionViewComponent);
    remove(this._statisticRankViewComponent);
    remove(this._statisticFiltersViewComponent);
    remove(this._statisticsViewComponent);
    remove(this._statisticTextViewComponent);
  }

}
