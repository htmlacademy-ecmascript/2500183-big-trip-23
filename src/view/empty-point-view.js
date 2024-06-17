import AbstractView from '../framework/view/abstract-view.js';

const createTripListEmptyTemplate = (message) => `<p class="trip-events__msg">${message}</p>`;

export default class EmptyPointView extends AbstractView {
  #message = '';

  constructor({ message }) {
    super();
    this.#message = message;
  }

  get template() {
    return createTripListEmptyTemplate(this.#message);
  }
}
