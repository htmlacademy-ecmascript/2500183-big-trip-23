import { UpdateType, UserAction, SortType } from '../mock/const.js';
import { sortPoints } from '../tools/sort.js';
import { filterBy, FiltersTypes } from '../tools/filter.js'; //TripEmptyMessages
import { remove, render, replace } from '../framework/render.js';

import TripEmptyPointView from '../view/trip-empty-point-view.js';
import NewTripEventsSortView from '../view/trip-events-sort-view';
import NewTripEventsListView from '../view/trip-events-list-view';
import PointPresenter from './point-presenter.js';
import AddPointPresenter from './add-point-presenter.js';

export default class MainPresenter {
  #containerListComponent = new NewTripEventsListView();
  #boardContainer = null;
  #pointModel = null;
  #addPointContainer = null;
  #pointPresenters = new Map();
  #newTripEventsSortView = null;
  #activeSortType = SortType.DAY;
  #filterModel = null;
  #filterType = FiltersTypes.EVERYTHING;
  #addPointPresenter = null;
  #closeAddForm = null;
  #tripEmptyPoint = null;

  constructor({ boardContainer, pointModel, filterModel, addPointContainer }) {
    this.#boardContainer = boardContainer;
    this.#pointModel = pointModel; //pointModel
    this.#filterModel = filterModel;
    this.#addPointContainer = addPointContainer;
    this.#addPointPresenter = new AddPointPresenter({
      container: this.#containerListComponent.element,
      destination: this.destinations,
      pointModel: this.#pointModel,
      onModeChange: this.#handleModeChange,
      onViewAction: this.#handleViewAction,
      addPointContainer: this.#addPointContainer,
      resetSorting: this.#handleSortChange,
      filterModel: this.#filterModel,
    });
    this.#closeAddForm = this.#addPointPresenter.removeAddForm;

    this.#pointModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);
  }

  init() {
    this.#renderEventsBody();
    this.#rendeAddPoint();
  }

  get points() {
    this.#filterType = this.#filterModel.filter;
    const points = this.#pointModel.points;
    const filteredPoints = filterBy[this.#filterType](points); //
    return sortPoints(filteredPoints, this.#activeSortType);
  }

  get destinations() {
    return this.#pointModel.destinations;
  }

  get offers() {
    return this.#pointModel.offers;
  }

  #renderEventsBody() {
    this.#renderSort();
    //this.#renderEmptyPoint();
    this.#renderPoints();
  }

  #renderSort() {
    if (this.#newTripEventsSortView !== null) {
      remove(this.#newTripEventsSortView);
    }

    this.#newTripEventsSortView = new NewTripEventsSortView({
      onSortChanges: this.#handleSortChange,
      activeSortType: this.#activeSortType,
    });

    render(this.#newTripEventsSortView, this.#boardContainer);
    render(this.#containerListComponent, this.#boardContainer);
  }

  #renderPoints() {
    if (!this.points.length) {
      this.#renderEmptyPoint();
    }
    this.points.forEach((point) => {
      // здесь точка этапа фильтроВ
      const pointPresenter = new PointPresenter({
        container: this.#containerListComponent.element,
        destination: this.destinations, // заменил на геттер !!!
        pointModel: this.#pointModel,
        onModeChange: this.#handleModeChange,
        onViewAction: this.#handleViewAction,
        closeAddForm: this.#closeAddForm,
      });

      pointPresenter.init(point);
      this.#pointPresenters.set(point.id, pointPresenter);
    });
  }

  #handleModeChange = () => {
    this.#pointPresenters.forEach((presenter) => presenter.resetView());
  };

  #handleSortChange = (nextSortType) => {
    // работаю над сортировкооооойййй........
    if (this.#activeSortType === nextSortType) {
      return;
    }
    this.#activeSortType = nextSortType;
    this.#clearPoints();
    sortPoints(this.#pointModel.points, this.#activeSortType);
    this.#renderEventsBody();
  };

  #clearPoints({ resetSortType = false } = {}) {
    // тут логика установки сортировки!!!
    this.#pointPresenters.forEach((presenter) => presenter.destroy());
    this.#pointPresenters.clear();

    if (resetSortType) {
      this.#activeSortType = SortType.DAY;
      this.#filterType = FiltersTypes.EVERYTHING;
      this.#renderEventsBody();
    }
  }

  #handleViewAction = (actionType, updateType, update) => {
    switch (actionType) {
      case UserAction.UPDATE_POINT:
        this.#pointModel.updatePoint(updateType, update);
        break;
      case UserAction.ADD_POINT:
        this.#pointModel.addPoint(updateType, update);
        break;
      case UserAction.DELETE_POINT:
        this.#pointModel.deletePoint(updateType, update);
        break;
    }
  };

  #handleModelEvent = (updateType, data) => {
    switch (updateType) {
      case UpdateType.PATCH:
        this.#pointPresenters.get(data.id).init(data);
        break;
      case UpdateType.MINOR:
        this.#clearPoints();
        this.#renderEventsBody();
        break;
      case UpdateType.MAJOR:
        this.#clearPoints({ resetSortType: true });
        break;
    }
  };

  #rendeAddPoint() {
    this.#addPointPresenter.init();
  }

  #renderEmptyPoint = () => {
    const prevEmptyPointComponent = this.#tripEmptyPoint;

    this.#tripEmptyPoint = new TripEmptyPointView({ filterType: this.#filterModel.filter });

    if (prevEmptyPointComponent === null) {
      render(this.#tripEmptyPoint, this.#containerListComponent.element);
      return;
    }
    replace(this.#tripEmptyPoint, prevEmptyPointComponent);
    remove(prevEmptyPointComponent);
  };
}
