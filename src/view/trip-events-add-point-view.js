import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import dayjs from 'dayjs';
import { markUpDestinationPhotos } from '../template/pictures.js';
import { markUpOfferSelectores } from '../template/offers-selector.js';
import flatpickr from 'flatpickr';
import { nanoid } from 'nanoid';

import { EVENT_TYPES} from '../mock/const.js';
import he from 'he';

const generateDestList = (destination) => `${destination.map((dest) => `<option value="${dest.name}"></option>`).join('')}`;

const createEventTypeTemplate = (type, pointType, id) => `
  <div class="event__type-item">
    <input id="event-type-${type.toLowerCase()}-${id}" class="event__type-input visually-hidden" type="radio" name="event-type-${id}" value="${type.toLowerCase()}" ${type.toLowerCase() === pointType ? 'checked' : ''}>
    <label class="event__type-label  event__type-label--${type.toLowerCase()}" for="event-type-${type.toLowerCase()}-${id}">${type}</label>
  </div>
`;

function createTripEventsAddPointElements(state,destination,offers,getOffers) {
  const { type, dateFrom, dateTo, basePrice, id } = state.point;

  let currentDestination = destination.find((element) => element.id === state.point.destination) || {};

  if (state.point.destination.length) {
    currentDestination = destination.find((element) => element.id === state.point.destination);
  }

  const typeOffers = getOffers(type);

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
        <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${currentDestination.length ? he.encode(currentDestination.name) : ''}" list="destination-list-1">
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

      <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
      <button class="event__reset-btn" type="reset">Delete</button>
      <button class="event__rollup-btn" type="button">
        <span class="visually-hidden">Open event</span>
      </button>
    </header>
    <section class="event__details">
      <section class="event__section  event__section--offers">
        ${typeOffers.length ? '<h3 class="event__section-title  event__section-title--offers">Offers</h3>' : ''}
        ${markUpOfferSelectores(typeOffers, state.point.offers)}
      </section>
      <section class="event__section  event__section--destination">
        ${currentDestination.length ? '<h3 class="event__section-title  event__section-title--destination">Destination</h3>' : ''}
        <p class="event__destination-description"></p>
        ${currentDestination.length ? markUpDestinationPhotos(currentDestination.pictures) : ''}
      </section>

    </section>
  </form>
</li>`;
}

export default class NewTripEventsAddPointView extends AbstractStatefulView {
  #initialPoint = null;
  #destination = null;
  #eventInputDestination = null;
  #eventTypeGroup = null;
  #eventInputPrice = null;
  #datepickerStart;
  #rollupButtonSave;
  #rollupButtonCancel;
  #resetAddForm = null;
  #submitTest = null;
  #offers = null;
  #getOffers = null;

  constructor({ offers, destination, point, resetForm, onSubmitSave,getOffers}) {
    super();
    this.#initialPoint = { ...point,
      id: nanoid(),
      type: point.type.toLowerCase(),
    };

    this.#getOffers = getOffers;
    this._setState({
      point: { ...point,
        id: nanoid(),
        type: point.type.toLowerCase(),
      },
    });
    this.#destination = destination;
    this.#resetAddForm = resetForm;
    this.#submitTest = onSubmitSave;
    this.offers = offers;
    this._restoreHandlers();
  }

  get template() {
    return createTripEventsAddPointElements(this._state, this.#destination,this.offers,this.#getOffers);
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
    this.#datepickerStart = flatpickr(this.element.querySelector('[name ="event-start-time"]'), {
      dateFormat: 'd/m/y h:i',
      enableTime: true,
      'time_24hr': true,
      defaultDate: this._state.point.dateFrom,
      maxDate: this._state.point.dateFrom,
      onChange: this.#dateFromChangeHandler,
    });
  }

  #setDatepickerEnd() {
    this.#datepickerStart = flatpickr(this.element.querySelector('[name ="event-end-time"]'), {
      dateFormat: 'd/m/y h:i',
      enableTime: true,
      'time_24hr': true,
      defaultDate: this._state.point.dateTo,
      minDate: this._state.point.dateTo,
      onChange: this.#dateToChangeHandler,
    });
  }

  #onSubmitSaveHand = (evt) => {
    evt.preventDefault();
    this.#submitTest({...this._state});
    this.resetStateVue();
    this.#resetAddForm();
  };

  #onSubmitCancelHand = (evt) => {
    evt.preventDefault();
    this.resetStateVue();
    this.#resetAddForm();
  };

  resetStateVue = () => {
    this.updateElement({
      point: { ...this.#initialPoint },
    });
  };
}

/*
<button class="event__rollup-btn" type="button">
</button> - убрал кнопку из разметки, спросить можно ли так!!!
*/
