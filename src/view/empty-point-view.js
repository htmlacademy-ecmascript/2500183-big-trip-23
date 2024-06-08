import { TripEmptyMessages } from '../tools/filter.js';
import AbstractView from '../framework/view/abstract-view.js';

const createTripListEmptyTemplate = (filterType) => {
  const currentPageMessageTextTipe = TripEmptyMessages[filterType];
  return `<p class="trip-events__msg">
      ${currentPageMessageTextTipe}
    </p>`;
};
export default class EmptyPointView extends AbstractView {
  #filterType = null;

  constructor({ filterType }) {
    super();
    this.#filterType = filterType;
  }

  get template() {
    return createTripListEmptyTemplate(this.#filterType);
  }
}
