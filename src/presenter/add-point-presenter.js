import { render,RenderPosition} from '../framework/render.js';
import EscapeHandler from '../tools/escape-handler.js';
import NewTripEventsAddPointView from '../view/trip-events-add-point-view';
import { UpdateType, UserAction } from '../mock/const.js';

export default class AddPointPresenter2 {
  #containerListComponent = null;
  #destination = null;
  #pointModel = null;
  #handleModeChange = null;
  #point = null;
  #escapeHandler = null;
  #handleViewAction = null;
  #addPointContainer = null;
  #buttonAddPoint = null;

  constructor({ container, destination, pointModel, onModeChange, onViewAction,addPointContainer }) {
    this.#containerListComponent = container;
    this.#destination = destination;
    this.#pointModel = pointModel;
    this.#handleModeChange = onModeChange;
    this.#handleViewAction = onViewAction;
    this.#addPointContainer = addPointContainer;
    this.#buttonAddPoint = this.#addPointContainer.querySelector('.trip-main__event-add-btn');

    document.addEventListener('keydown', this.#onEscKeyDown);

    this.#escapeHandler = new EscapeHandler(this.#handleModeChange);
  }

  init() {
    this.#buttonAddPoint.addEventListener('click', this.#clickAddPoint);
  }

  #clickAddPoint = () => {
    render(new NewTripEventsAddPointView(),this.#containerListComponent,RenderPosition.AFTERBEGIN);
    this.#escapeHandler.enable();
    this.#escapeHandler = new EscapeHandler(this.#handleModeChange);
    this.#handleModeChange();
    this.#buttonAddPoint.disabled = true;
  };

  #onEscKeyDown = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      console.log('test');
      this.#handleModeChange();// спросить почему не работает!!!
    }
  };
}
