import MainPresenter from './presenter/main-presenter.js';
import HeaderPresenter from './presenter/head-presenter.js';
import PointModel from './mock/model/points-model.js';
import FilterModel from './mock/model/filter-model.js';

import FilterPresenter from'./presenter/filter-presenter.js';

const filterModel = new FilterModel();
const pointModel = new PointModel();
pointModel.init();


const siteHeaderFilterElement = document.querySelector('.trip-controls__filters');
const siteHeaderTripMainContainer = document.querySelector('.trip-main');
const mainPageElem = document.querySelector('.trip-events');

const headerPagePresenter = new HeaderPresenter({ boardContainer: siteHeaderTripMainContainer, headerContainer: siteHeaderFilterElement });
const filterPresenter = new FilterPresenter({pointModel:pointModel, filterModel: filterModel, filterContainer:siteHeaderFilterElement});
const mainPagePresenter = new MainPresenter({ boardContainer: mainPageElem, pointModel: pointModel, filterModel: filterModel});

filterPresenter.init();
headerPagePresenter.init();
mainPagePresenter.init();
