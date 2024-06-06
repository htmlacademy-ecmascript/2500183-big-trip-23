import { render, replace, remove } from '../framework/render.js';
import EscapeHandler from '../tools/escape-handler.js';
import NewTripEventsPointView from '../view/trip-events-points-view';
import NewTripEventsEditPointView from '../view/trip-events-edit-point-view';
import { updateItem } from '../utils/data.js';
import { UpdateType, UserAction } from '../mock/const.js';

const Mode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING',
};

export default class PointPresenter {
  #containerListComponent = null;
  #destination = null;
  #pointModel = null;
  #handleModeChange = null;
  #point = null;
  #tripPointComponent = null;
  #tripEditComponent = null;
  #escapeHandler = null;
  #handleViewAction = null;
  #mode = Mode.DEFAULT;

  constructor({ container, destination, pointModel, onModeChange, onViewAction }) {
    this.#containerListComponent = container;
    this.#destination = destination;
    this.#pointModel = pointModel;
    this.#handleModeChange = onModeChange;
    this.#handleViewAction = onViewAction;
  }

  init(point) {
    this.#point = point;
    this.#renderPoint(this.#point, this.#destination, this.#pointModel.getOffersByType.bind(this.#pointModel)); //определить ,откуда пришла точка!!!
  }

  #renderPoint(point, destination, getOffers) {
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
      },
    });
    this.#tripEditComponent = new NewTripEventsEditPointView({
      point,
      destination,
      onEditClick: () => {
        this.#changeBackEditViewPoint();
      },
      getOffers,
      onDelete: () => this.#handleDeleteClick(),
      onSubmitSave: this.#handleFormSubmit, // изменить имя,когда закончу
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
    this.#escapeHandler.enable();
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

  #updateFavorite(point) {
    const updatePoint = updateItem(point, { isFavorite: !point.isFavorite });
    this.#handleViewAction(UserAction.UPDATE_POINT, UpdateType.PATCH, updatePoint);
  }

  #handleDeleteClick = () => {
    this.#handleViewAction(UserAction.DELETE_POINT, UpdateType.MINOR, this.#point);
    this.#escapeHandler.disable();
    this.#mode = Mode.DEFAULT;
  };

  #handleFormSubmit = ({ point }) => {
    this.#handleViewAction(UserAction.UPDATE_POINT, UpdateType.MINOR, point);
    this.#escapeHandler.disable();
    this.#mode = Mode.DEFAULT;
  };
}
