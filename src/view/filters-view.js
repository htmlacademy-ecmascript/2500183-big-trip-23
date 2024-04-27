import {createElement} from '../render.js';

function createFormTripEventsTemplate() {
  return ``;
}

export default class NewTaskFilterTripEventsView {
  getTemplate() {
    return createFormTripEventsTemplate();
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
