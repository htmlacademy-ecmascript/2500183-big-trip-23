import {render,RenderPosition} from '../render';
import NewTripEventsListView from '../view/trip-events-list-view';
import NewTripEventsSortView from '../view/trip-events-sort-view';
import NewTripInfoHeader from '../view/trip-info-header';
import NewTripFiltersView from '../view/trip-filters-view';

export default class BoardPresenter {
  constructor() {
    this.siteHeaderFilterElement = document.querySelector('.trip-controls__filters');
    this.siteHeaderTripMainContainer = document.querySelector('.trip-main');
    this.siteTripEventsSection = document.querySelector('.trip-events');
  }

  init() {
    render(new NewTripFiltersView(), this.siteHeaderFilterElement);
    render(new NewTripInfoHeader(), this.siteHeaderTripMainContainer,RenderPosition.AFTERBEGIN);
    render(new NewTripEventsSortView(),this.siteTripEventsSection);
    render(new NewTripEventsListView(),this.siteTripEventsSection);
  }
}
