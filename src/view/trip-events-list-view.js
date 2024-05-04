import { createElement } from '../render.js';

function createTripEventsListElements() {
  return '<ul class="trip-events__list"></ul>';
}

export default class NewTripEventsListView {
  getTemplate() {
    return createTripEventsListElements();
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }

    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
