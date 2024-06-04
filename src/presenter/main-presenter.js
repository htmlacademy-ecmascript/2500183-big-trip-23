import { UpdateType, UserAction, SortType} from '../mock/const.js';
import { sortPoints } from '../tools/sort.js';
import {filterBy,FiltersTypes} from '../tools/filter.js';
import {remove, render, RenderPosition} from '../framework/render.js';

import NewTripEventsSortView from '../view/trip-events-sort-view';
import NewTripEventsListView from '../view/trip-events-list-view';
//import NewTripEventsAddPointView from '../view/trip-events-add-point-view';
import PointPresenter from './point-presenter.js';
import { updateData } from '../utils/data.js';




export default class MainPresenter {
  #containerListComponent = new NewTripEventsListView();
  #boardContainer = null;
  #pointModel = null;
  #pointPresenters = new Map();
  #points = [];
  #destinations = [];
  #newTripEventsSortView = null;
  #activeSortType = SortType.DAY;
  #filterModel = null;
  #filterType = FiltersTypes.EVERYTHING;

  constructor({ boardContainer, pointModel,filterModel }) {
    this.#boardContainer = boardContainer;
    this.#pointModel = pointModel;
    this.#filterModel = filterModel;

    this.#pointModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);
  }

  init() {
    //this.#points = this.points;
    //this.#destinations
    this.#renderEventsBody();
  }

  get points() {
    this.#filterType = this.#filterModel.filter;
    const points = this.#pointModel.points;
    const filteredPoints = filterBy[this.#filterType](points);
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
    this.points.forEach((point) => { // здесь точка этапа фильтроВ
      const pointPresenter = new PointPresenter({
        container: this.#containerListComponent.element,
        destination: this.destinations,// заменил на геттер !!!
        pointModel: this.#pointModel,
        onModeChange: this.#handleModeChange,
        onViewAction: this.#handleViewAction,
      });

      pointPresenter.init(point);
      this.#pointPresenters.set(point.id, pointPresenter);
    });
  }

  #handleDataFavorite = (updatePoint) => {
    this.#points = updateData(this.#points, updatePoint);
    // this.#pointPresenters.get(updatePoint.id).init(updatePoint);
  };

  #handleModeChange = () => {
    this.#pointPresenters.forEach((presenter) => presenter.resetView());
  };

  #sorType = (sortype) => {
    this.#containerListComponent.element.innerHTML = '';
    this.#points = sortPoints(this.#pointModel.points, sortype);

    this.#points.forEach((point) => {
      this.#pointPresenters.get(point.id).rerender();
    });
  };

  #handleSortChange = (nextSortType) => {
    this.#activeSortType = nextSortType;
    this.#sorType(this.#activeSortType);
  };

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
    // В зависимости от типа изменений решаем, что делать:
    // - обновить часть списка (например, когда поменялось описание)
    // - обновить список (например, когда задача ушла в архив)
    // - обновить всю доску (например, при переключении фильтра)
    switch (updateType) {
      case UpdateType.PATCH:
        this.#handleDataFavorite(data);
        this.#pointPresenters.get(data.id).init(data);
        break;
      case UpdateType.MINOR:
        console.log(updateType);
       //this.#clearPoints();
        //this.#renderEventsBody();

        break;
      case UpdateType.MAJOR:
        console.log(updateType);
        //this.#clearPoints({resetSortType: true});
        // this.#renderEventsBody();

        break;
    }
  };
}
