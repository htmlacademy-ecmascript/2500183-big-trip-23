import AbstractView from '../framework/view/abstract-view.js';
import { SortType } from '../mock/const.js';

const DISABLED_SORT_TYPES = [SortType.EVENT, SortType.OFFERS];
const SORT_PREFIX = 'sort-';

const getSortTemplate = (activeSortType) =>
  `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
  ${Object.values(SortType)
    .map(
      (sortType) => `<div class="trip-sort__item  trip-sort__item--${sortType}">
      <input id="sort-${sortType}" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-${sortType}"${sortType === activeSortType ? 'checked' : ''}${DISABLED_SORT_TYPES.includes(sortType) ? 'disabled' : ''}>
      <label class="trip-sort__btn" for="sort-${sortType}">${sortType}</label>
    </div>`,
    )
    .join('')}
</form>`;

export default class NewTripEventsSortView extends AbstractView {
  #handleSortChange = null;
  #activeSortType = '';

  constructor({ onSortChanges, activeSortType }) {
    super();
    this.#handleSortChange = onSortChanges;
    this.#activeSortType = activeSortType || SortType.DAY;

    this.element.addEventListener('change', this.#sortChangeHandler);
  }

  get template() {
    return getSortTemplate(this.#activeSortType);
  }

  #sortChangeHandler = (evt) => {
    const sortType = evt.target.id.replace(SORT_PREFIX, '');
    this.#handleSortChange(sortType);
  };
}
