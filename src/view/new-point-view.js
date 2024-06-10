import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import dayjs from 'dayjs';
import { markUpDestinationPhotos } from '../template/pictures.js';
import { markUpOffers } from '../template/offers-selector.js';
import flatpickr from 'flatpickr';

import { EVENT_TYPES, defaultPoint } from '../mock/const.js';
import he from 'he';
import { DEFAULT_PICKER_OPTIONS } from '../const.js';
import { createEventTypeTemplate} from '../template/type-event.js';
import {generateDestList,getCurrentDestination} from'../tools/destination-tools.js';


function createTripEventsAddPointElements(state, destination, offers, getOffers) {
  const { type, dateFrom, dateTo, basePrice, id,isDisabled,isSaving } = state.point;
  const currentDestination = getCurrentDestination(state.point.destination,destination) || {};
  const eventId = state.point.id;

  return `<li class="trip-events__item">
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
        <label class="event__label  event__type-output" for="event-destination-1">
        ${type}
        </label>
        <input class="event__input  event__input--destination" id="event-destination-${eventId}" type="text" name="event-destination" value="${currentDestination.name ? he.encode(currentDestination.name) : ''}" list="destination-${eventId}">
        <datalist id="destination-${eventId}">
          ${generateDestList(destination)}
        </datalist>
      </div>

      <div class="event__field-group  event__field-group--time">
        <label class="visually-hidden" for="event-start-time">From</label>
        <input class="event__input event__input--time" id="event-start-time" type="text" name="event-start-time" value="${
  dateFrom ? dayjs(dateFrom).format('DD/MM/YY HH:mm') : ''
}">
        &mdash;
        <label class="visually-hidden" for="event-end-time">To</label>
        <input class="event__input  event__input--time" id="event-end-time" type="text" name="event-end-time" value="${dateTo ? dayjs(dateTo).format('DD/MM/YY HH:mm') : ''}">
      </div>

      <div class="event__field-group  event__field-group--price">
        <label class="event__label" for="event-price-1">
          <span class="visually-hidden">Price</span>
          &euro;
        </label>
        <input class="event__input  event__input--price" id="event-price-1" type="number" name="event-price"  min="1" value="${he.encode(basePrice.toString())}">
      </div>

      <button class="event__save-btn  btn  btn--blue" type="submit" ${isDisabled ? 'disabled' : ''}>${isSaving ? 'Saving...' : 'Save'}</button>
      <button class="event__reset-btn" type="reset">Cancel</button>
    </header>
    <section class="event__details">
    ${markUpOffers(state.point, getOffers)}
      <section class="event__section  event__section--destination">
        ${currentDestination.description ? '<h3 class="event__section-title  event__section-title--destination">Destination</h3>' : ''}
        <p class="event__destination-description">${currentDestination.description ? currentDestination.description : ''}</p>
        ${currentDestination.pictures ? markUpDestinationPhotos(currentDestination.pictures) : ''}
      </section>

    </section>
  </form>
</li>`;
}

export default class NewPointView extends AbstractStatefulView {
  #initialPoint = null;
  #destination = null;
  #eventInputDestination = null;
  #eventTypeGroup = null;
  #eventInputPrice = null;
  #datepickerStart;
  #rollupButtonSave;
  #rollupButtonCancel;
  #resetAddForm = null;
  #onSubmitSave = null;
  #offers = null;
  #getOffers = null;

  constructor({ offers, destination, resetForm, onSubmitSave, getOffers }) {
    super();

    this.#getOffers = getOffers;
    this._setState({
      point: { ...defaultPoint,
        isDisabled: false,
        isSaving: false,
      },
    });
    this.#destination = destination;
    this.#resetAddForm = resetForm;
    this.#onSubmitSave = onSubmitSave;
    this.offers = offers;
    this._restoreHandlers();
  }

  get template() {
    return createTripEventsAddPointElements(this._state, this.#destination, this.offers, this.#getOffers);
  }

  _restoreHandlers() {
    this.#eventInputDestination = this.element.querySelector('.event__input--destination');
    this.#eventTypeGroup = this.element.querySelector('.event__type-group');
    this.#eventInputPrice = this.element.querySelector('.event__input--price');
    this.#rollupButtonSave = this.element.querySelector('.event__save-btn');
    this.#rollupButtonCancel = this.element.querySelector('.event__reset-btn');

    this.#rollupButtonCancel.addEventListener('click', this.#onSubmitCancelHand);
    this.#rollupButtonSave.addEventListener('click', this.#onSubmitSaveHand);
    this.#eventInputDestination.addEventListener('change', this.#destinationTypeHandler);
    this.#eventTypeGroup.addEventListener('change', this.#eventTypeHandler);
    this.#eventInputPrice.addEventListener('change', this.#priceInputHandler);

    this.#setDatepickerStart();
    this.#setDatepickerEnd();
  }

  #destinationTypeHandler = (evt) => {
    evt.preventDefault();
    const newDestination = evt.target.value;

    const typeDestination = this.#destination.find((destination) => destination.name === newDestination);
    if (!typeDestination) {
      return;
    }
    this.updateElement({
      point: {
        ...this._state.point,
        destination: typeDestination.id,
      },
    });
  };

  #eventTypeHandler = (evt) => {
    evt.preventDefault();
    const newType = evt.target.value;

    this.updateElement({
      point: {
        ...this._state.point,
        type: newType,
      },
    });
  };

  #priceInputHandler = (evt) => {
    const userPrice = evt.target.value;
    this.updateElement({
      point: {
        ...this._state.point,
        basePrice: userPrice,
      },
    });
  };

  #dateFromChangeHandler = ([userDate]) => {
    this.updateElement({
      point: {
        ...this._state.point,
        dateFrom: userDate,
      },
    });
  };

  #dateToChangeHandler = ([userDate]) => {
    this.updateElement({
      point: {
        ...this._state.point,
        dateTo: userDate,
      },
    });
  };

  #setDatepickerStart() {
    this.#datepickerStart = flatpickr(this.element.querySelector('#event-start-time'), {
      ...DEFAULT_PICKER_OPTIONS,
      maxDate: new Date(),
      onChange: this.#dateFromChangeHandler,
    });
  }

  #setDatepickerEnd() {
    this.#datepickerStart = flatpickr(this.element.querySelector('#event-end-time'), {
      ...DEFAULT_PICKER_OPTIONS,
      minDate: new Date(),
      onChange: this.#dateToChangeHandler,
    });
  }

  #onSubmitSaveHand = () => {

    if (this.#isValid()) {
      delete this._state.point.isDisabled;//выделить в отдельный метод
      delete this._state.point.isSaving;//выделить в отдельный метод

      this.#onSubmitSave(this._state);
      this.resetState();
      this.#resetAddForm();
    }
  };

  #isValid() {
    const point = this._state.point;
    return point.destination && point.dateFrom && point.dateTo && point.basePrice;
  }

  #onSubmitCancelHand = (evt) => {
    evt.preventDefault();
    this.resetState();
    this.#resetAddForm();
  };

  resetState = () => {
    this.updateElement({
      point: { ...defaultPoint },
    });
  };
}
