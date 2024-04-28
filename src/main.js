import {render,RenderPosition} from './render.js';
import NewTripFiltersView from './view/trip-filters-view.js';
import NewTripInfoHeader from './view/trip-info-header.js';
import NewTripEventsSortView from './view/trip-events-sort-view.js';
import NewTripEventsListView from './view/trip-events-list-view.js';

const siteHeaderFilterElement = document.querySelector('.trip-controls__filters');
const siteHeaderTripMainContainer = document.querySelector('.trip-main');
const siteTripEventsSection = document.querySelector('.trip-events');

function init() {
  render(new NewTripInfoHeader(), siteHeaderTripMainContainer,RenderPosition.AFTERBEGIN);
  render(new NewTripFiltersView(), siteHeaderFilterElement);
  render(new NewTripEventsSortView(),siteTripEventsSection);
  render(new NewTripEventsListView(),siteTripEventsSection);
}

init();

