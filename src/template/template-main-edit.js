import { EVENT_TYPES } from '../const.js';
import { createEventTypeTemplate } from './type-event';
import { generateDestList } from '../tools/destination-tools.js';
import { markUpOffers } from './offers-selector.js';
import { markUpDestinationPhotos } from './pictures.js';

import dayjs from 'dayjs';
import he from 'he';

export const getTemplateEditPoint = (
  type,
  id,
  destination,
  currentDestination,
  dateFrom,
  dateTo,
  basePrice,
  statePoint,
  getOffers,
  isDeleting,
  isDisabled,
  isSaving,
) => `
<li class="trip-events__item">
  <form class="event event--edit" action="#" method="post">
    <header class="event__header">
      <div class="event__type-wrapper">
        <label class="event__type  event__type-btn" for="event-type-toggle-1">
          <span class="visually-hidden">Choose event type</span>
          <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
        </label>
        <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

        <div class="event__type-list">
          <fieldset class="event__type-group">
            <legend class="visually-hidden">Event type</legend>
            ${EVENT_TYPES.map((group) => createEventTypeTemplate(group, type, id)).join('')}
          </fieldset>
        </div>
      </div>
      <div class="event__field-group  event__field-group--destination">
        <label class="event__label  event__type-output" for="event-destination-1">${type}</label>
        <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${currentDestination ? he.encode(currentDestination.name) : ''}" list="destination-list-1">
        <datalist id="destination-list-1">
          ${generateDestList(destination)}
        </datalist>
      </div>
      <div class="event__field-group  event__field-group--time">
        <label class="visually-hidden" for="event-start-time-1">From</label>
        <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${dayjs(dateFrom).format('DD/MM/YY HH:mm')}">
        &mdash;
        <label class="visually-hidden" for="event-end-time-1">To</label>
        <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${dayjs(dateTo).format('DD/MM/YY HH:mm')}">
      </div>

      <div class="event__field-group  event__field-group--price">
        <label class="event__label" for="event-price-1">
          <span class="visually-hidden">Price</span>
          &euro;
        </label>
        <input class="event__input  event__input--price" id="event-price-1" type="number" name="event-price"  min="1" value="${he.encode(basePrice.toString())}">
      </div>

      <button class="event__save-btn  btn  btn--blue" type="submit" ${isDisabled ? 'disabled' : ''}>${isSaving ? 'Saving...' : 'Save'}</button>
      <button class="event__reset-btn" type="reset" ${isDeleting ? 'disabled' : ''}>${isDeleting ? 'Deleting...' : 'Delete'}</button>
      <button class="event__rollup-btn" type="button">
        <span class="visually-hidden">Open event</span>
      </button>
    </header>
    <section class="event__details">
      ${markUpOffers(statePoint, getOffers)}

      ${
  currentDestination && (currentDestination.description || currentDestination.pictures.length)
    ? `
        <section class="event__section  event__section--destination">
          ${currentDestination.length ? '<h3 class="event__section-title  event__section-title--destination">Destination</h3>' : ''}
          <p class="event__destination-description">${currentDestination.description}</p>
          ${markUpDestinationPhotos(currentDestination.pictures)}
        </section>
      `
    : ''
}
    </section>
  </form>
</li>`;
