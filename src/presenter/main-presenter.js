import {render} from '../render';
import NewTripEventsSortView from '../view/trip-events-sort-view';//
import NewTripEventsListView from '../view/trip-events-list-view';//
import NewTripEventsPointView from '../view/trip-events-points-view';//
import NewTripEventsAddPointView from '../view/trip-events-add-point-view';//
import NewTripEventsEditPointView from '../view/trip-events-edit-point-view';

export default class MainPresenter {
  containerListComponent = new NewTripEventsListView();
  constructor({boardContainer}) {
    this.boardContainer = boardContainer;
  }

  init() {
    render(new NewTripEventsSortView(), this.boardContainer);
    render(this.containerListComponent, this.boardContainer);
    render(new NewTripEventsAddPointView(), this.containerListComponent.getElement());
    render(new NewTripEventsEditPointView(),this.containerListComponent.getElement());

    for (let i = 0; i < 3; i++) {
      render(new NewTripEventsPointView(), this.containerListComponent.getElement());
    }
  }
}
