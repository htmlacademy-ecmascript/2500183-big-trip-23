import { render,remove } from '../framework/render.js';
import NewTripEventsSortView from '../view/trip-events-sort-view';
import NewTripEventsListView from '../view/trip-events-list-view';
import NewTripEventsAddPointView from '../view/trip-events-add-point-view';
import PointPresenter from './point-presenter.js';
import { updateData } from '../utils/data.js';
import {SortType} from '../mock/const.js';
//import {sortPoints} from '../tools/sort.js';

export default class MainPresenter {
  #containerListComponent = new NewTripEventsListView();
  #boardContainer = null;
  #pointModel = null;
  #pointPresenters = new Map();
  #points = [];
  #destination = [];
  #newTripEventsSortView = null;
  #activeSortType = SortType.DAY;

  constructor({ boardContainer, pointModel }) {
    this.#boardContainer = boardContainer;
    this.#pointModel = pointModel;
  }

  init() {
    this.#clearTrip();
   // sortPoints();

   // this.#points = sortPoints(this.#pointModel.points,this.#activeSortType);
    this.#points = this.#pointModel.points;
    this.#destination = this.#pointModel.destinations;
    this.#renderPoint();
  }

  #clearTrip() {
    if(!this.#points) {
      remove(this.#containerListComponent);
      this.#containerListComponent = null;
      return;
    }
    this.#pointPresenters.forEach((presenter) => presenter.destroy());
    remove(this.#containerListComponent);
    remove(this.#newTripEventsSortView);

    this.#newTripEventsSortView = null;
  }

  #renderPoint() {
    this.#newTripEventsSortView = new NewTripEventsSortView({onSortChanges:this.#activeSortType,activeSortType:this.#handleSortChange});
    render(this.#newTripEventsSortView,this.#boardContainer);
    render(this.#containerListComponent, this.#boardContainer);
    render(new NewTripEventsAddPointView(), this.#containerListComponent.element);

    this.#points.forEach((point) => {
      const pointPresenter = new PointPresenter({
        container: this.#containerListComponent.element,
        destination: this.#destination,
        pointModel: this.#pointModel,
        onPointUpdate: this.#handleDataTest,
        onModeChange: this.#handleModeChange,
      });

      pointPresenter.init(point);
      this.#pointPresenters.set(point.id, pointPresenter);
    });
  }

  #handleDataTest = (updatePoint) => {
    this.#points = updateData(this.#points, updatePoint);
    this.#pointPresenters.get(updatePoint.id).init(updatePoint);
  };

  #handleModeChange = () => {
    this.#pointPresenters.forEach((presenter) => presenter.resetView());
  };

  #handleSortChange = (nextSortType) => {
    //this.#activeSortType = nextSortType;
    this.init();
    console.log(nextSortType);
  };
}
