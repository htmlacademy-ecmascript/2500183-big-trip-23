import AbstractView from '../framework/view/abstract-view.js';
//import {FILTER_TYPES} from '../mock/const.js';
/*
const createFilterItemTemplate = (value, isChecked, isDisabled) => `
  <div class="trip-filters__filter">
    <input id="filter-${value}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter"
      value="${value}" ${getIsCheckedAttr(isChecked)} ${getIsDisabledAttr(isDisabled)}>
    <label class="trip-filters__filter-label" for="filter-${value}">${firstLetterUpperCase(value)}</label>
  </div>
`;
*/

const firstLetterUpperCase = (word) => {
  const [firstLetter, ...rest] = word;
  //return `${firstLetter.toUpperCase()}${rest.join('')}`;
  console.log(firstLetter);

  console.log(...rest);
};

function createFormFiltersElements() {
  firstLetterUpperCase('интересно');
  return `<form class="trip-filters" action="#" method="get">
  <div class="trip-filters__filter">
    <input id="filter-everything" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="everything" checked>
    <label class="trip-filters__filter-label" for="filter-everything">Everything</label>
  </div>

  <div class="trip-filters__filter">
    <input id="filter-future" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="future">
    <label class="trip-filters__filter-label" for="filter-future">Future</label>
  </div>

  <div class="trip-filters__filter">
    <input id="filter-present" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="present">
    <label class="trip-filters__filter-label" for="filter-present">Present</label>
  </div>

  <div class="trip-filters__filter">
    <input id="filter-past" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="past">
    <label class="trip-filters__filter-label" for="filter-past">Past</label>
  </div>

  <button class="visually-hidden" type="submit">Accept filter</button>
</form>`;
}

export default class NewTripFiltersView extends AbstractView {
  get template() {
    return createFormFiltersElements();
  }
}
