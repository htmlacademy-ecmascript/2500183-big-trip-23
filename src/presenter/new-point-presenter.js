import { remove, render, RenderPosition } from '../framework/render.js';
import EscapeHandler from '../tools/escape-handler.js';
import NewPointView from '../view/new-point-view.js';
import { UpdateType, UserAction, SortType } from '../const.js';
import { defaultPoint } from '../const.js';
import { FiltersTypes } from '../tools/filter.js';

const ModeAdded = {
  DEFAULT: 'DEFAULT',
  ADDED: 'ADDED',
};

export default class NewPointPresenter {
  #containerListComponent = null;
  #destination = null;
  #pointModel = null;
  #handleModeChange = null;
  #point = null;
  #escapeHandler = null;
  #handleViewAction = null;
  #addPointContainer = null;
  #buttonAddPoint = null;
  #defaulPoint = null;
  #vueAddPoint = null;
  #getOffers = null;
  #tripAddComponent = null;
  #mode = ModeAdded.DEFAULT;
  #resetSorting = null;
  #filterModel = null;
  #deletingEmptyPoint = null;
  #recoveryEmptyPoint = null;

  constructor({
    container,
    destination,
    pointModel,
    onModeChange,
    onViewAction,
    addPointContainer,
    resetSorting,
    filterModel,
    deletingEmptyPoint,
    recoveryEmptyPoint,
  }) {
    this.#containerListComponent = container;
    this.#destination = destination;
    this.#pointModel = pointModel;
    this.#handleModeChange = onModeChange;
    this.#handleViewAction = onViewAction;
    this.#addPointContainer = addPointContainer;
    this.#buttonAddPoint = this.#addPointContainer.querySelector('.trip-main__event-add-btn');
    this.#defaulPoint = defaultPoint;
    this.#getOffers = this.#pointModel.getOffersByType.bind(this.#pointModel);
    this.#resetSorting = resetSorting;
    this.#escapeHandler = new EscapeHandler(this.#onEscKeyDown);
    this.#filterModel = filterModel;
    this.#deletingEmptyPoint = deletingEmptyPoint;
    this.#recoveryEmptyPoint = recoveryEmptyPoint;
  }

  init(destinations) {
    this.#buttonAddPoint.addEventListener('click', this.#clickAddPoint);
    this.#destination = destinations;
  }

  #clickAddPoint = () => {
    this.#tripAddComponent = new NewPointView({
      offers: this.#pointModel.offers,
      destination: this.#destination,
      // resetForm: this.removeAddForm,
      onSubmitSave: this.handleAddFormSubmit,
      onButtonCancel: this.#onEscKeyDown,
      getOffers: this.#getOffers,
    });

    render(this.#tripAddComponent, this.#containerListComponent, RenderPosition.AFTERBEGIN);
    this.#escapeHandler.enable();
    this.#handleModeChange();
    this.disableButton();
    this.#mode = ModeAdded.ADDED;
    this.#resetSorting(SortType.DAY);
    this.#filterModel.setFilter(UpdateType.MAJOR, FiltersTypes.EVERYTHING);
    this.#deletingEmptyPoint(this.#mode);
  };

  #onEscKeyDown = () => {
    this.activateButton();
    this.#escapeHandler.disable();

    // this.removeAddForm();
    this.#handleViewAction(UserAction.CANCEL);
    remove(this.#tripAddComponent);
  };

  activateButton = () => {
    this.#buttonAddPoint.disabled = false;
  };

  disableButton = () => {
    this.#buttonAddPoint.disabled = true;
  };

  removeAddForm = () => {
    if (this.#mode === ModeAdded.ADDED) {
      remove(this.#tripAddComponent);
      this.activateButton();
      this.#mode = ModeAdded.DEFAULT;
      this.#recoveryEmptyPoint(this.#mode);

      this.#handleViewAction(UserAction.CANCEL);
    }
  };

  handleAddFormSubmit = ({ point }) => {
    this.#handleViewAction(UserAction.ADD_POINT, UpdateType.MAJOR, point);
  };

  testShake = () => {
    // const defaultStatePoint = this.#tripAddComponent.defaultStatePoint;
    this.#tripAddComponent.shake();
  };
}
