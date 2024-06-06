
import { remove, render,RenderPosition} from '../framework/render.js';
import EscapeHandler from '../tools/escape-handler.js';
import NewTripEventsAddPointView from '../view/trip-events-add-point-view';
import { UpdateType, UserAction } from '../mock/const.js';
import { EVENT_TYPES, defaultPoint } from '../mock/const.js';

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

  constructor({ container, destination, pointModel, onModeChange, onViewAction,addPointContainer }) {
    this.#containerListComponent = container;
    this.#destination = destination;
    this.#pointModel = pointModel;
    this.#handleModeChange = onModeChange;
    this.#handleViewAction = onViewAction;
    this.#addPointContainer = addPointContainer;
    this.#buttonAddPoint = this.#addPointContainer.querySelector('.trip-main__event-add-btn');
    this.#defaulPoint = defaultPoint;

    this.#escapeHandler = new EscapeHandler(this.#onEscKeyDown);
  }

  init() {
    this.#buttonAddPoint.addEventListener('click', this.#clickAddPoint);
  }

  #clickAddPoint = () => {

    this.#tripAddComponent = new NewTripEventsAddPointView ({point:this.#defaulPoint,destination:this.#destination,resetForm:this.removeAddForm
    });
    render(this.#tripAddComponent,this.#containerListComponent,RenderPosition.AFTERBEGIN);
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
}

