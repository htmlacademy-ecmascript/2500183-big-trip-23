import { UpdateType, UserAction, SortType } from '../mock/const.js';
import { sortPoints } from '../tools/sort.js';
import { filterBy, FiltersTypes } from '../tools/filter.js'; //TripEmptyMessages
import { remove, render, replace } from '../framework/render.js';
import UiBlocker from '../framework/ui-blocker/ui-blocker.js';

import LoadingView from '../view/loading-view.js';
import EmptyPointView from '../view/empty-point-view.js';
import EventsSortView from '../view/events-sort-view.js';
import EventsListView from '../view/events-list-view.js';
import PointPresenter from './point-presenter.js';
import NewPointPresenter from './new-point-presenter.js';

const TimeLimit = {
  LOWER_LIMIT: 350,
  UPPER_LIMIT: 1000,
};

const ModeAdded = {
  DEFAULT: 'DEFAULT',
  ADDED: 'ADDED',
};

export default class MainPresenter {
  #containerListComponent = new EventsListView();
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
  #loadingComponent = new LoadingView();
  #isLoading = true;

  #uiBlocker = new UiBlocker({
    lowerLimit: TimeLimit.LOWER_LIMIT,
    upperLimit: TimeLimit.UPPER_LIMIT
  });

  constructor({ boardContainer, pointModel, filterModel, addPointContainer }) {
    this.#boardContainer = boardContainer;
    this.#pointModel = pointModel;
    this.#filterModel = filterModel;
    this.#addPointContainer = addPointContainer;

    this.#addPointPresenter = new NewPointPresenter({
      container: this.#containerListComponent.element,
      destination: this.destinations,
      pointModel: this.#pointModel,
      onModeChange: this.#handleModeChange,
      onViewAction: this.#handleViewAction,
      addPointContainer: this.#addPointContainer,
      resetSorting: this.#handleSortChange,
      filterModel: this.#filterModel,
      deletingEmptyPoint:this.deletingEmptyPoint,
      recoveryEmptyPoint:this.recoveryEmptyPoint
    });

    this.#closeAddForm = this.#addPointPresenter.removeAddForm;

    this.#pointModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);
    this.#addPointPresenter.disableButton();
  }

  init() {
    this.#uiBlocker.block();
    this.#renderLoadingMessage();
    this.#renderEventsBody();
  }

  get points() {
    this.#filterType = this.#filterModel.filter;
    const points = this.#pointModel.points;
    const filteredPoints = filterBy[this.#filterType](points);
    return sortPoints(this.#activeSortType, filteredPoints, this.#pointModel);
  }

  get destinations() {
    return this.#pointModel.destinations;
  }

  get offers() {
    return this.#pointModel.offers;
  }

  #renderEventsBody() {
    this.#showEmptyPoint();
    this.#renderSort();
    this.#renderPoints();
  }

  #renderSort() {
    if (this.#newTripEventsSortView !== null) {
      remove(this.#newTripEventsSortView);
    }

    this.#newTripEventsSortView = new EventsSortView({
      onSortChanges: this.#handleSortChange,
      activeSortType: this.#activeSortType,
    });

    render(this.#newTripEventsSortView, this.#boardContainer);
    render(this.#containerListComponent, this.#boardContainer);
  }

  #renderPoints() {

    console.log('points',  this.points);

    this.points.forEach((point) => {
      const pointPresenter = new PointPresenter({
        container: this.#containerListComponent.element,
        destination: this.destinations,
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
    remove(this.#tripEmptyPoint);
  };

  #handleSortChange = (nextSortType) => {
    if (this.#activeSortType === nextSortType) {
      return;
    }

    this.#activeSortType = nextSortType;
    this.#clearPoints();
    sortPoints(this.#activeSortType, this.#pointModel.points, this.#pointModel);
    this.#renderEventsBody();
  };

  #clearPoints({ resetSortType = false } = {}) {
    this.#pointPresenters.forEach((presenter) => presenter.destroy());
    this.#pointPresenters.clear();

    if (resetSortType) {
      console.log('render');
      this.#activeSortType = SortType.DAY;
      this.#filterType = FiltersTypes.EVERYTHING;
      this.#renderEventsBody();
    }
  }

  #handleViewAction = async (actionType, updateType, update) => {
    this.#uiBlocker.block();

    switch (actionType) {
      case UserAction.UPDATE_POINT:
        console.log('UPDATE');
        try {
          await this.#pointModel.updatePoint(updateType, update);
        } catch (err) {
          //throw new Error('Can\'t update point');
          this.#pointPresenters.get(update.id).testShake();
        }
        break;
      case UserAction.ADD_POINT:
        console.log('ADD');
        try {
          await this.#pointModel.addPoint(updateType, update);
          this.#addPointPresenter.removeAddForm();
        } catch (err) {
          this.#addPointPresenter.testShake();
        }
        break;
      case UserAction.CANCEL:
        if (this.#pointModel.points.length === 0) {
          render(this.#tripEmptyPoint, this.#containerListComponent.element);
        }
        break;
      case UserAction.DELETE_POINT:
        console.log('DELETE_POINT');
        try {
          await this.#pointModel.deletePoint(updateType, update);
        } catch (err) {
          throw new Error('Can\'t delete point');
        }
        break;
    }

    console.log('UNBLOCK');
    this.#uiBlocker.unblock();
  };

  #handleModelEvent = async (updateType, data) => {
    console.log('sfsfsdfsdf', updateType);

    switch (updateType) {
      case UpdateType.PATCH:
        this.#pointPresenters.get(data.id).init(data);
        break;
      case UpdateType.MINOR:
        this.#clearPoints({ resetSortType: true });
        this.#renderEventsBody();
        break;
      case UpdateType.MAJOR:
        this.#clearPoints({ resetSortType: true });
        break;
      case UpdateType.INIT:
        this.#uiBlocker.unblock();
        this.#isLoading = false;
        remove(this.#loadingComponent);// нужно будет переделать!!!
        this.#addPointPresenter.activateButton();
        this.#clearPoints({ resetSortType: true });
        this.#renderAddPoint(this.destinations);
        break;
    }
  };

  #renderAddPoint(destinations) {
    this.#addPointPresenter.init(destinations);
  }

  #renderEmptyPoint = () => {
    const prevEmptyPointComponent = this.#tripEmptyPoint;

    this.#tripEmptyPoint = new EmptyPointView({ filterType: this.#filterModel.filter });

    if (prevEmptyPointComponent === null) {
      render(this.#tripEmptyPoint, this.#containerListComponent.element);
      return;
    }

    replace(this.#tripEmptyPoint, prevEmptyPointComponent);
    remove(prevEmptyPointComponent);
  };

  #showEmptyPoint = () => {
    if (!this.points.length && !this.#isLoading) {
      this.#renderEmptyPoint();
    } else {
      if(this.#tripEmptyPoint) {
        remove(this.#tripEmptyPoint);
        this.#tripEmptyPoint = null;
      }
    }
  };

  #renderLoadingMessage() {
    if(this.#isLoading) {
      render(this.#loadingComponent, this.#containerListComponent.element);
    }
  }

  deletingEmptyPoint = (marker) => {
    if(marker === ModeAdded.ADDED) {
      if(this.#tripEmptyPoint) {
        remove(this.#tripEmptyPoint);
        this.#tripEmptyPoint = null;
      }
    }
  };

  recoveryEmptyPoint = (marker) => {
    if(marker === ModeAdded.DEFAULT) {
      if(!this.#tripEmptyPoint) {
        this.#renderEmptyPoint();
      }
    }
  };
}
