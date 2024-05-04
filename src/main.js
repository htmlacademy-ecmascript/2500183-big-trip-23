import MainPresenter from './presenter/main-presenter.js';
import HeaderPresenter from './presenter/head-presenter.js';
//import PointModel from './mock/model/points-model.js';

//const pointModel = new PointModel;
//pointModel.init();

const siteHeaderFilterElement = document.querySelector('.trip-controls__filters');
const siteHeaderTripMainContainer = document.querySelector('.trip-main');
const mainPageElem = document.querySelector('.trip-events');
const headerPagePresenter = new HeaderPresenter({boardContainer:siteHeaderTripMainContainer,headerContainer:siteHeaderFilterElement});
//const mainPagePresenter = new MainPresenter({boardContainer:mainPageElem,pointModel:pointModel });
const mainPagePresenter = new MainPresenter({boardContainer:mainPageElem});

headerPagePresenter.init();
mainPagePresenter.init();
console.log('rtrrt');
