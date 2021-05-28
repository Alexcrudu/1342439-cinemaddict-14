import SmartView from './smart.js';
// import dayjs from 'daysjs';
import Chart from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import {getGenresCounts} from '../utils/functions.js';


const renderChart = (statisticCtx, labelsArray, dataArray) => {
  const BAR_HEIGHT = 50;

  statisticCtx.height = BAR_HEIGHT * dataArray.length;

  return new Chart(statisticCtx, {
    plugins: [ChartDataLabels],
    type: 'horizontalBar',
    data: {
      labels: labelsArray,
      datasets: [{
        data: dataArray,
        backgroundColor: '#ffe800',
        hoverBackgroundColor: '#ffe800',
        anchor: 'start',
        barThickness: 24,
      }],
    },
    options: {
      plugins: {
        datalabels: {
          font: {
            size: 20,
          },
          color: '#ffffff',
          anchor: 'start',
          align: 'start',
          offset: 40,
        },
      },
      scales: {
        yAxes: [{
          ticks: {
            fontColor: '#ffffff',
            padding: 100,
            fontSize: 20,
          },
          gridLines: {
            display: false,
            drawBorder: false,
          },
        }],
        xAxes: [{
          ticks: {
            display: false,
            beginAtZero: true,
          },
          gridLines: {
            display: false,
            drawBorder: false,
          },
        }],
      },
      legend: {
        display: false,
      },
      tooltips: {
        enabled: false,
      },
    },
  });
};


const createStatisticsTemplate = () => {

  return `<div class="statistic__chart-wrap">
            <canvas class="statistic__chart" width="1000"></canvas>
          </div>`;
};


export default class Statistics extends SmartView {
  constructor(films) {
    super();
    this._films = films;
    this._statChart = null;
    this._ganresInfo = getGenresCounts(this._films);

    this._setChart();
  }

  getTemplate() {
    return createStatisticsTemplate(this._films, this._genresInfo);
  }

  removeElement() {
    super.removeElement();

    if (this._statChart !== null) {
      this._statChart = null;
    }
  }

  _setChart() {
    if (this._statChart !== null) {
      this._statChart = null;
    }

    const statisticCtx = this.getElement().querySelector('.statistic__chart');

    this._statChart = renderChart(statisticCtx, Object.keys(this._ganresInfo), Object.values(this._ganresInfo));
  }
}
