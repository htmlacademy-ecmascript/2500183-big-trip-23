import { render, replace, remove } from '../framework/render.js';
import EscapeHandler from '../tools/escape-handler.js';
import NewTripEventsPointView from '../view/trip-events-points-view';
import NewTripEventsEditPointView from '../view/trip-events-edit-point-view';
import { updateItem } from '../utils/data.js';
import {UserAction, UpdateType} from '../mock/const.js';

const Mode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING',
};

export default class PointPresenter {
  #containerListComponent = null;
  #destination = null;
  #pointModel = null;
  #handlePointUpdates = null;
  #handleModeChange = null;
  #point = [];
  #tripPointComponent = null;
  #tripEditComponent = null;
  #escapeHandler = null;
  #mode = Mode.DEFAULT;
  #handleModelEvent = null;

  constructor({ container, destination, pointModel, onPointUpdate, onModeChange,onModelEvent }) {
    this.#containerListComponent = container;
    this.#destination = destination;
    this.#pointModel = pointModel;
    this.#handlePointUpdates = onPointUpdate;
    this.#handleModeChange = onModeChange;
    this.#handleModelEvent = onModelEvent;
  }

  init(point) {
    this.#renderPointsTest(point, this.#destination, this.#pointModel.getOffersByType.bind(this.#pointModel));
  }

  rerender() {

    this.#mode = Mode.DEFAULT;
    render(this.#tripPointComponent, this.#containerListComponent);
  }

  #renderPointsTest(point, destination, getOffers) {
    this.#point = point;

    const prevPointComponent = this.#tripPointComponent;
    const prevPointEditComponent = this.#tripEditComponent;

    this.#escapeHandler = new EscapeHandler(this.#changeBackEditViewPoint.bind(this.#changeBackEditViewPoint));

    this.#tripPointComponent = new NewTripEventsPointView({
      point: this.#point,
      destination,
      onEditClick: () => {
        this.#changeEditViewPoint();
      },
      getOffers,
      onFavoritClick: () => {
        this.#updateFavorite(this.#point);
        this.#handleModelEvent(UserAction.UPDATE_TASK,
          UpdateType.MINOR,);
      },
    });
    this.#tripEditComponent = new NewTripEventsEditPointView({
      point,
      destination,
      onEditClick: () => {
        this.#changeBackEditViewPoint();
      },
      onSubmitSave: () => {
        this.#savePoint();
      },
      onSubmitDelete: () => {
        this.#deletePoint();
      },
      getOffers,
    });

    if (prevPointComponent === null || prevPointEditComponent === null) {
      render(this.#tripPointComponent, this.#containerListComponent);
      return;
    }

    if (this.#mode === Mode.DEFAULT) {
      replace(this.#tripPointComponent, prevPointComponent);
    }

    if (this.#mode === Mode.EDITING) {
      replace(this.#tripPointComponent, prevPointEditComponent);
    }

    remove(prevPointComponent);
    remove(prevPointEditComponent);
  }

  destroy() {
    remove(this.#tripPointComponent);
    remove(this.#tripEditComponent);
  }

  resetView() {
    if (this.#mode !== Mode.DEFAULT) {
      this.#changeBackEditViewPoint();
    }
  }

  #changeEditViewPoint = () => {
    replace(this.#tripEditComponent, this.#tripPointComponent);
    this.#escapeHandler.enable();
    this.#handleModeChange();
    this.#mode = Mode.EDITING;
  };

  #changeBackEditViewPoint = () => {
    replace(this.#tripPointComponent, this.#tripEditComponent);
    this.#escapeHandler.disable();
    this.#mode = Mode.DEFAULT;
  };

  #savePoint = () => {
    replace(this.#tripPointComponent, this.#tripEditComponent);
    this.#escapeHandler.disable();
    this.#mode = Mode.DEFAULT;
  };

  #deletePoint = () => {
    replace(this.#tripPointComponent, this.#tripEditComponent);
    this.#escapeHandler.disable();
    this.#mode = Mode.DEFAULT;
  };

  #updateFavorite(point) {
    const updatePoint = updateItem(point, { isFavorite: !point.isFavorite });
    this.#handlePointUpdates(updatePoint);
  }
}
