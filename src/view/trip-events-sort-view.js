import AbstractView from '../framework/view/abstract-view.js';
import {SortType} from '../mock/const.js';


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

  constructor({onSortChanges,activeSortType}) {
    super();
    this.#handleSortChange = onSortChanges;
    this.#activeSortType = activeSortType || SortType.DAY;

    this.element.addEventListener('change',this.#sortChangeHandler);
  }


  get template() {
    return getSortTemplate(this.#activeSortType);
  }

  #sortChangeHandler = (evt) => {
    const sortType = evt.target.id.replace(SORT_PREFIX,'');
    //this.#handleSortChange(sortType);
    console.log(sortType);
  };
}
//activeSortType
/*
function createTripEventsSortElements() {
  return `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
  <div class="trip-sort__item  trip-sort__item--day">
    <input id="sort-day" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-day" checked>
    <label class="trip-sort__btn" for="sort-day">Day</label>
  </div>

  <div class="trip-sort__item  trip-sort__item--event">
    <input id="sort-event" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-event" disabled>
    <label class="trip-sort__btn" for="sort-event">Event</label>
  </div>

  <div class="trip-sort__item  trip-sort__item--time">
    <input id="sort-time" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-time">
    <label class="trip-sort__btn" for="sort-time">Time</label>
  </div>

  <div class="trip-sort__item  trip-sort__item--price">
    <input id="sort-price" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-price">
    <label class="trip-sort__btn" for="sort-price">Price</label>
  </div>

  <div class="trip-sort__item  trip-sort__item--offer">
    <input id="sort-offer" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-offer" disabled>
    <label class="trip-sort__btn" for="sort-offer">Offers</label>
  </div>
</form>`;
}*/
