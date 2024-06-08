import AbstractView from '../framework/view/abstract-view.js';

function createTripEventsListElements() {
  return '<ul class="trip-events__list"></ul>';
}

export default class EventsListView extends AbstractView {
  get template() {
    return createTripEventsListElements();
  }
}
