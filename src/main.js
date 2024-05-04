//import BoardPresenter from './presenter/new-presenter.js';//коммент для теста!
//import {generateAddWaypoint} from './mock/points.js';
//const myBoardepresenters = new BoardPresenter();
//import './test.ts';

import MainPresenter from './presenter/main-presenter.js';
import HeaderPresenter from './presenter/head-presenter.js';

const siteHeaderFilterElement = document.querySelector('.trip-controls__filters');
const siteHeaderTripMainContainer = document.querySelector('.trip-main');
const mainPageElem = document.querySelector('.trip-events');
const headerPagePresenter = new HeaderPresenter({boardContainer:siteHeaderTripMainContainer,headerContainer:siteHeaderFilterElement});
const mainPagePresenter = new MainPresenter({boardContainer:mainPageElem});

headerPagePresenter.init();
mainPagePresenter.init();
