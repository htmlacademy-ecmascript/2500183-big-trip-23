import { render } from '../framework/render.js';
import NewTripEventsSortView from '../view/trip-events-sort-view';
import NewTripEventsListView from '../view/trip-events-list-view';
import NewTripEventsAddPointView from '../view/trip-events-add-point-view';
import PointPresenter from './point-presenter.js';
import { updateData } from '../utils/data.js';

export default class MainPresenter {
  #containerListComponent = new NewTripEventsListView();
  #boardContainer = null;
  #pointModel = null;
  #pointPresenters = new Map();
  #points = [];
  #destination = [];

  constructor({ boardContainer, pointModel }) {
    this.#boardContainer = boardContainer;
    this.#pointModel = pointModel;

  }

  init() {
    this.#points = this.#pointModel.points;
    this.#destination = this.#pointModel.destinations;
    this.#renderPoint();
  }

  #renderPoint() {
    render(new NewTripEventsSortView(), this.#boardContainer);
    render(this.#containerListComponent, this.#boardContainer);
    render(new NewTripEventsAddPointView(), this.#containerListComponent.element);

    this.#points.forEach((point) => {
      const pointPresenter = new PointPresenter({
        container: this.#containerListComponent.element,
        destination: this.#destination,
        pointModel: this.#pointModel,
        onPointUpdate: this.#handleDataTest,
      });

      pointPresenter.init(point);
      this.#pointPresenters.set(point.id,pointPresenter);
    });


  }

  #handleDataTest = (updatePoint) => {
    this.#points = updateData(this.#points,updatePoint);
    this.#pointPresenters.get(updatePoint.id).init(updatePoint);
  };
}

