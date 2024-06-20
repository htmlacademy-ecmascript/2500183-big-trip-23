import MainPresenter from './presenter/main-presenter.js';
import HeaderPresenter from './presenter/header-presenter.js';
import FilterPresenter from './presenter/filter-presenter.js';

import PointModel from './model/points-model.js';
import FilterModel from './model/filter-model.js';
import PointsApiService from './points-api-service.js';

const AUTHORIZATION = 'Basic test3';
const END_POINT = 'https://23.objects.htmlacademy.pro/big-trip';

const filterModel = new FilterModel();
const pointModel = new PointModel({
  pointsApiService: new PointsApiService(END_POINT, AUTHORIZATION),
});
pointModel.init();

const siteHeaderFilterElement = document.querySelector('.trip-controls__filters');
const siteHeaderTripMainContainer = document.querySelector('.trip-main');
const mainPageElem = document.querySelector('.trip-events');

const headerPagePresenter = new HeaderPresenter({ boardContainer: siteHeaderTripMainContainer });
const filterPresenter = new FilterPresenter({ pointModel: pointModel, filterModel: filterModel, filterContainer: siteHeaderFilterElement });
const mainPagePresenter = new MainPresenter({
  boardContainer: mainPageElem,
  pointModel: pointModel,
  filterModel: filterModel,
  addPointContainer: siteHeaderTripMainContainer,
});

filterPresenter.init();
headerPagePresenter.init();
mainPagePresenter.init();
