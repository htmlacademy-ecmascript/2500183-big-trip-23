import { remove, render, RenderPosition } from '../framework/render.js';
import EscapeHandler from '../tools/escape-handler.js';
import NewTripEventsAddPointView from '../view/trip-events-add-point-view';
import { UpdateType, UserAction,SortType } from '../mock/const.js';
import { defaultPoint } from '../mock/const.js';
import {FiltersTypes} from '../tools/filter.js';

const ModeAdded = {
  DEFAULT: 'DEFAULT',
  ADDED: 'ADDED',
};

export default class AddPointPresenter {
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

  constructor({ container, destination, pointModel, onModeChange, onViewAction, addPointContainer,resetSorting,filterModel }) {
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
  }

  init() {
    this.#buttonAddPoint.addEventListener('click', this.#clickAddPoint);
  }

  #clickAddPoint = () => {
    this.#tripAddComponent = new NewTripEventsAddPointView({
      offers:this.#pointModel.offers,
      destination: this.#destination,
      point:defaultPoint,
      resetForm: this.removeAddForm,
      onSubmitSave: this.handleAddFormSubmit,
      getOffers: this.#getOffers
    });
    render(this.#tripAddComponent, this.#containerListComponent, RenderPosition.AFTERBEGIN);
    this.#escapeHandler.enable();
    this.#handleModeChange();
    this.#buttonAddPoint.disabled = true;
    this.#mode = ModeAdded.ADDED;
  };

  #onEscKeyDown = () => {
    this.activateButton();
    this.#escapeHandler.disable();
    this.removeAddForm();
  };

  activateButton = () => {
    this.#buttonAddPoint.disabled = false;
  };

  removeAddForm = () => {
    if(this.#mode === ModeAdded.ADDED) {
      remove(this.#tripAddComponent);
      this.activateButton();
      this.#mode = ModeAdded.DEFAULT;
    }
  };

  handleAddFormSubmit = ({ point }) => {
    this.#handleViewAction(UserAction.ADD_POINT, UpdateType.MAJOR, point);
    this.#resetSorting(SortType.DAY);
    this.#filterModel.setFilter(UpdateType.MAJOR, FiltersTypes.EVERYTHING);
  };
}
