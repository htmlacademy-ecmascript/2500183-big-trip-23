import AbstractView from '../framework/view/abstract-view.js';

function createTripEventsListElements() {
  return '<ul class="trip-events__list"></ul>';
}

export default class NewTripEventsListView extends AbstractView {
  get template() {
    return createTripEventsListElements();
  }
}
