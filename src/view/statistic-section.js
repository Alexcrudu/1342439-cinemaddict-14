import AbstractView from './abstract.js';

const createStatisticSectionTemplate = () => {
  return '<section class="statistic"></section>';
};

export default class StatisticSection extends AbstractView {
  getTemplate() {
    return createStatisticSectionTemplate();
  }
}
