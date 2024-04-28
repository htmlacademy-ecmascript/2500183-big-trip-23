import {render,RenderPosition} from './render.js';
import NewTripFiltersView from './view/trip-filters-view.js';
import NewTripInfoHeader from './view/trip-info-header.js';
import NewTripEventsSortView from './view/trip-events-sort-view.js';
import BoardPresenter from './presenter/new-presenter.js';

const siteHeaderFilterElement = document.querySelector('.trip-controls__filters');
const siteHeaderTripMainContainer = document.querySelector('.trip-main');
const siteTripEventsSection = document.querySelector('.trip-events');

const myBoardepresenters = new BoardPresenter();

function init() {
  render(new NewTripInfoHeader(), siteHeaderTripMainContainer,RenderPosition.AFTERBEGIN);
  render(new NewTripFiltersView(), siteHeaderFilterElement);
  render(new NewTripEventsSortView(),siteTripEventsSection);
}

init();
myBoardepresenters.init();


