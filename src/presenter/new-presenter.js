import {render,RenderPosition} from '../render';
import NewTripEventsSortView from '../view/trip-events-sort-view';
import NewTripInfoHeader from '../view/trip-info-header';
import NewTripFiltersView from '../view/trip-filters-view';
import NewTripEventsListView from '../view/trip-events-list-view';
import NewTripEventsPointView from '../view/trip-events-points-view';

export default class BoardPresenter {
  containerListComponent = new NewTripEventsListView();
  constructor() {
    this.siteHeaderFilterElement = document.querySelector('.trip-controls__filters');
    this.siteHeaderTripMainContainer = document.querySelector('.trip-main');
    this.siteTripEventsSection = document.querySelector('.trip-events');
  }

  init() {
    render(new NewTripFiltersView(), this.siteHeaderFilterElement);
    render(new NewTripInfoHeader(), this.siteHeaderTripMainContainer,RenderPosition.AFTERBEGIN);
    render(new NewTripEventsSortView(),this.siteTripEventsSection);
    render(this.containerListComponent,this.siteTripEventsSection);

    for (let i = 0; i < 3; i++) {
      render(new NewTripEventsPointView(),this.containerListComponent.getElement());
    }
  }
}
