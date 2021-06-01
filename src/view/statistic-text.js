import AbstractView from './abstract.js';
import dayjs from 'dayjs';
import { getGenresCounts } from '../utils/functions.js';

const createStatisticTextTemplate = (films, genresCounts) => {
  const getTotalDuration = () => {
    let totalDuration = 0;
    films.forEach((film) => film.watched.already_watched ? totalDuration += film.duration : '');
    return {
      hours: dayjs({ minute: totalDuration }).hour(),
      minutes: dayjs({ minute: totalDuration }).minute(),
    };
  };

  const youWatchedValue =  films.filter((film) => film.watched.already_watched).length;
  const totalDurationValue = getTotalDuration();

  const getTopGenre = () => {
    if(genresCounts === 0){
      return;
    }

    let max = -Infinity;
    const maxWatchedGenre = Object.entries(genresCounts).reduce((a, [key, val]) => {
      if (val > max) {
        max = val;
        return [key];
      }
      if (val === max) {
        a.push(key);
      }
      return a;
    }, []);

    return maxWatchedGenre.length > 0 ? maxWatchedGenre[0] : '';
  };

  return `<ul class="statistic__text-list">
  <li class="statistic__text-item">
    <h4 class="statistic__item-title">You watched</h4>
    <p class="statistic__item-text">${youWatchedValue} <span class="statistic__item-description">movies</span></p>
  </li>
  <li class="statistic__text-item">
    <h4 class="statistic__item-title">Total duration</h4>
    <p class="statistic__item-text">${totalDurationValue.hours} <span class="statistic__item-description">h</span> ${totalDurationValue.minutes} <span class="statistic__item-description">m</span></p>
  </li>
  <li class="statistic__text-item">
    <h4 class="statistic__item-title">Top genre</h4>
    <p class="statistic__item-text">${getTopGenre()}</p>
  </li>
</ul>`;
};

export default class StatisticText extends AbstractView {
  constructor(films) {
    super();
    this._films = films;
    this._ganresInfo = getGenresCounts(this._films);
  }

  getTemplate() {
    return createStatisticTextTemplate(this._films, this._ganresInfo);
  }
}
