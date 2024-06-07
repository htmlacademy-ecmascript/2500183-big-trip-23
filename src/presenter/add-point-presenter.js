import { remove, render, RenderPosition } from '../framework/render.js';
import EscapeHandler from '../tools/escape-handler.js';
import NewTripEventsAddPointView from '../view/trip-events-add-point-view';
import { UpdateType, UserAction } from '../mock/const.js';
import { defaultPoint } from '../mock/const.js';

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

  constructor({ container, destination, pointModel, onModeChange, onViewAction, addPointContainer }) {
    this.#containerListComponent = container;
    this.#destination = destination;
    this.#pointModel = pointModel;
    this.#handleModeChange = onModeChange;
    this.#handleViewAction = onViewAction;
    this.#addPointContainer = addPointContainer;
    this.#buttonAddPoint = this.#addPointContainer.querySelector('.trip-main__event-add-btn');
    this.#defaulPoint = defaultPoint;
    this.#getOffers = this.#pointModel.getOffersByType.bind(this.#pointModel);

    this.#escapeHandler = new EscapeHandler(this.#onEscKeyDown);//toLowerCase()

    //const test = defaultPoint.type.toLowerCase();

    //console.log(this.#getOffers(test));

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
    remove(this.#tripAddComponent);
    this.activateButton();
  };

  handleAddFormSubmit = ({ point }) => {
    //this.#handleViewAction(UserAction.ADD_POINT, UpdateType.MAJOR, point); - работает!!! не с первого раза
    //remove(this.#tripAddComponent);
    //this.#escapeHandler.disable();
    console.log( point );
  };
}
