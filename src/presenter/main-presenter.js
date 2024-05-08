import {render} from '../framework/render.js';
import NewTripEventsSortView from '../view/trip-events-sort-view';//
import NewTripEventsListView from '../view/trip-events-list-view';//
import NewTripEventsPointView from '../view/trip-events-points-view';//
import NewTripEventsAddPointView from '../view/trip-events-add-point-view';//
import NewTripEventsEditPointView from '../view/trip-events-edit-point-view';

export default class MainPresenter {
  #containerListComponent = new NewTripEventsListView();
  #boardContainer = null;
  #pointModel = null;

  constructor({boardContainer,pointModel}) {
    this.#boardContainer = boardContainer;
    this.#pointModel = pointModel;
  }

  init() {
    const points = this.#pointModel.points;
    const destination = this.#pointModel.destinations;

    const offersTest = this.#pointModel.offers;

    render(new NewTripEventsSortView(), this.#boardContainer);
    render(this.#containerListComponent, this.#boardContainer);
    render(new NewTripEventsAddPointView(), this.#containerListComponent.element);
    render(new NewTripEventsEditPointView(points[0], destination,offersTest),this.#containerListComponent.element);

    points.forEach((point) => {
      render(new NewTripEventsPointView(point, destination,offersTest), this.#containerListComponent.element);
    });
  }
}
