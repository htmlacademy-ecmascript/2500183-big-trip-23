import { render, replace, remove } from '../framework/render.js';
import EscapeHandler from '../tools/escape-handler.js';
import PointView from '../view/point-view.js';
import EditPointView from '../view/edit-point-view';
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
  #closeAddForm = null;


  constructor({ container, destination, pointModel, onModeChange, onViewAction, closeAddForm }) {
    this.#containerListComponent = container;
    this.#destination = destination;
    this.#pointModel = pointModel;
    this.#handleModeChange = onModeChange;
    this.#handleViewAction = onViewAction;
    this.#closeAddForm = closeAddForm;
  }

  init(point) {
    this.#point = point;
    this.#renderPoint(this.#point, this.#destination, this.#pointModel.getOffersByType.bind(this.#pointModel));
  }

  #renderPoint(point, destination, getOffers,getDestinationId) {
    this.#point = point;

    this.#escapeHandler = new EscapeHandler(this.#changeBackEditViewPoint.bind(this.#changeBackEditViewPoint));

    const prevPointComponent = this.#tripPointComponent;
    const prevPointEditComponent = this.#tripEditComponent;

    this.#tripPointComponent = new PointView({
      point: this.#point,
      destination,
      onEditClick: () => {
        this.#changeEditViewPoint();
        this.#closeAddForm();
      },
      getOffers,
      onFavoriteClick: () => {
        this.#updateFavorite(this.#point);
      },
      getDestinationId,
    });
    this.#tripEditComponent = new EditPointView({
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
    this.#tripEditComponent.resetStateView();
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

  testShake = () => {
    const defaultStatePoint = this.#tripEditComponent.defaultStatePoint;
    this.#tripEditComponent.shake(defaultStatePoint);
  };
}
