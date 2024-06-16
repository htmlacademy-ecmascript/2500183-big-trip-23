import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import dayjs from 'dayjs';
import { markUpDestinationPhotos } from '../template/pictures.js';
import { markUpOffers } from '../template/offers-selector.js';
import flatpickr from 'flatpickr';

import { EVENT_TYPES, defaultPoint } from '../const.js';
import he from 'he';
import { DEFAULT_PICKER_OPTIONS } from '../const.js';
import { createEventTypeTemplate } from '../template/type-event.js';
import { generateDestList, getCurrentDestination } from '../tools/destination-tools.js';

function createTripEventsAddPointElements(state, destination, offers, getOffers, basePrice) {
  const { type, dateFrom, dateTo, id, isDisabled, isSaving } = state.point;

  const currentDestination = getCurrentDestination(state.point.destination, destination);
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
        <input class="event__input  event__input--destination" id="event-destination-${eventId}" type="text" name="event-destination" value="${currentDestination && currentDestination.name ? he.encode(currentDestination.name) : ''}" list="destination-${eventId}">
        <datalist id="destination-${eventId}">
          ${generateDestList(destination)}
        </datalist>
      </div>

      <div class="event__field-group  event__field-group--time">
        <label class="visually-hidden" for="event-start-time">From</label>
        <input class="event__input event__input--time" id="event-start-time" type="text" name="event-start-time" value="${dateFrom ? dayjs(dateFrom).format('DD/MM/YY HH:mm') : ''}">
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

      ${
  currentDestination && (currentDestination.description || currentDestination.pictures.length)
    ? `
        <section class="event__section  event__section--destination">
          ${currentDestination ? '<h3 class="event__section-title  event__section-title--destination">Destination</h3>' : ''}
          <p class="event__destination-description">${currentDestination.description}</p>
          ${markUpDestinationPhotos(currentDestination.pictures ? currentDestination.pictures : '')}
        </section>
      `
    : ''
}
    </section>
  </form>
</li>`;
}

export default class NewPointView extends AbstractStatefulView {
  #initialPoint = null;
  #destination = null;
  #eventInputDestination = null;
  #eventAvailableOffers = null;
  #eventTypeGroup = null;
  #eventInputPrice = null;
  #datepickerStart;
  #rollupButtonSave;
  #rollupButtonCancel;
  #onSubmitSave = null;
  #onButtonCancel;
  #offers = null;
  #getOffers = null;

  #basePrice = 0;

  constructor({ offers, destination, onSubmitSave, onButtonCancel, getOffers }) {
    super();
    this.#initialPoint = defaultPoint;
    this.#getOffers = getOffers;
    this._setState({
      point: { ...defaultPoint, isDisabled: false, isSaving: false },
    });
    this.#destination = destination;
    // this.#resetAddForm = resetForm;
    this.#onSubmitSave = onSubmitSave;
    this.#onButtonCancel = onButtonCancel;
    this.#offers = offers;
    this.#basePrice = defaultPoint.basePrice;
    this._restoreHandlers();
  }

  get template() {
    return createTripEventsAddPointElements(this._state, this.#destination, this.#offers, this.#getOffers, this.#basePrice);
  }

  _restoreHandlers() {
    this.#eventInputDestination = this.element.querySelector('.event__input--destination');
    this.#eventTypeGroup = this.element.querySelector('.event__type-group');
    this.#eventInputPrice = this.element.querySelector('.event__input--price');
    this.#eventAvailableOffers = this.element.querySelectorAll('.event__available-offers');
    this.#rollupButtonSave = this.element.querySelector('.event__save-btn');
    this.#rollupButtonCancel = this.element.querySelector('.event__reset-btn');

    this.#rollupButtonCancel.addEventListener('click', this.#onSubmitCancelHand);
    this.#rollupButtonSave.addEventListener('click', this.#onSubmitSaveHand);
    this.#eventInputDestination.addEventListener('change', this.#destinationTypeHandler);
    this.#eventAvailableOffers.forEach((checkbox) => checkbox.addEventListener('change', this.#offersCheckboxHandler));
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
      this.shake();
    }

    this.updateElement({
      point: {
        ...this._state.point,
        destination: typeDestination ? typeDestination.id : '',
      },
    });
  };

  #eventTypeHandler = (evt) => {
    evt.preventDefault();
    const newType = evt.target.value;

    this.updateElement({
      point: {
        ...this._state.point,
        offers: this.#initialPoint.type === newType ? this.#initialPoint.offers : [],
        type: newType,
      },
    });
  };

  #priceInputHandler = (evt) => {
    evt.preventDefault();
    this.#basePrice = +evt.target.value;
  };

  #offersCheckboxHandler = (evt) => {
    const setOfOffers = new Set(this._state.point.offers);

    if (setOfOffers.has(evt.target.id) && !evt.target.checked) {
      setOfOffers.delete(evt.target.id);
    } else {
      setOfOffers.add(evt.target.id);
    }

    this.updateElement({
      point: {
        ...this._state.point,
        offers: Array.from(setOfOffers),
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

  #onSubmitSaveHand = (evt) => {
    evt.preventDefault();
    this._state.point.basePrice = this.#basePrice;

    if (this.#isValid()) {
      this.clearStatePoint();

      this.#onSubmitSave(this._state);
      this.setSaving();
      this.resetState();
    } else {
      this.shake();
    }
  };

  #isValid() {
    const point = this._state.point;
    return point.destination && point.dateFrom && point.dateTo && point.basePrice;
  }

  #onSubmitCancelHand = (evt) => {
    evt.preventDefault();
    this.resetState();
    this.#onButtonCancel();
  };

  resetState = () => {
    this.updateElement({
      point: { ...defaultPoint },
    });
  };

  setSaving = () => {
    this.updateElement({
      point: {
        ...this._state.point,
        isDisabled: true,
        isSaving: true,
      },
    });
  };

  clearStatePoint = () => {
    delete this._state.point.isDisabled;
    delete this._state.point.isSaving;
  };

  defaultStatePoint = () => {
    this.updateElement({
      point: { ...defaultPoint, isDisabled: false, isSaving: false },
    });
  };
}
