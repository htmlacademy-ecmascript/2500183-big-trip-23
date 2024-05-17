import { render } from '../framework/render.js';
import NewTripEventsSortView from '../view/trip-events-sort-view';
import NewTripEventsListView from '../view/trip-events-list-view';
import NewTripEventsAddPointView from '../view/trip-events-add-point-view';
import PointPresenter from './point-presenter.js';

export default class MainPresenter {
  #containerListComponent = new NewTripEventsListView();
  #boardContainer = null;
  #pointModel = null;

  constructor({ boardContainer, pointModel }) {
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

    points.forEach((point) => {
      this.#renderPoint(point, destination, offersTest);
    });
  }

  #renderPoint(point, destination, offersTest) {
    const pointPresenter = new PointPresenter({
      container: this.#containerListComponent.element,
      point,
      destination,
      offersTest,
      pointModel: this.#pointModel,
    });
    pointPresenter.init();
  }
}
