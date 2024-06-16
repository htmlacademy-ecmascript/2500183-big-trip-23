import Observable from '../../framework/observable.js';
import { FiltersTypes } from '../../tools/filter.js';

export default class FilterModel extends Observable {
  #filterType = FiltersTypes.EVERYTHING;

  get filter() {
    return this.#filterType;
  }

  setFilter(updateType, filter) {
    this.#filterType = filter;
    this._notify(updateType, filter);
  }
}
