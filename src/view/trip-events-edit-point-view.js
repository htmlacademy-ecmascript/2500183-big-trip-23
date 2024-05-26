import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import dayjs from 'dayjs';
import { markUpDestinationPhotos } from '../template/pictures.js';
import { markUpOfferSelectores } from '../template/offers-selector.js';

const EVENT_TYPES = ['Taxi', 'Bus', 'Train', 'Ship', 'Drive', 'Flight', 'Check-in', 'Sightseeing', 'Restaurant'];

const createEventTypeTemplate = (type, pointType, id) => `
  <div class="event__type-item">
    <input id="event-type-${type.toLowerCase()}-${id}" class="event__type-input visually-hidden" type="radio" name="event-type-${id}" value="${type.toLowerCase()}" ${type.toLowerCase() === pointType ? 'checked' : ''}>
    <label class="event__type-label  event__type-label--${type.toLowerCase()}" for="event-type-${type.toLowerCase()}-${id}">${type}</label>
  </div>
`;

const generateDestList = (destination) => `${destination.map((dest) => `<option value="${dest.name}"></option>`).join('')}`;

function createTripEventsEditPointElements(state, destination, getOffers) {
  const { type, dateFrom, dateTo, basePrice,id } = state.point;
  const currentDestination = destination.find((element) => element.id === state.point.destination);
  const typeOffers = getOffers(state.point.type);

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
        <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${currentDestination.name}" list="destination-list-1">
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
        <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${basePrice}">
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
        ${currentDestination.description.length || currentDestination.pictures.length ? '<h3 class="event__section-title  event__section-title--destination">Destination</h3>' : ''}
        <p class="event__destination-description">${currentDestination.description}</p>
        ${markUpDestinationPhotos(currentDestination.pictures)}
      </section>
    </section>
  </form>
</li>`;
}

export default class NewTripEventsEditPointView extends AbstractStatefulView {
  #destination = null;
  #initialPoint = null;
  #onEditClick = null;
  #rollupButton = null;
  #rollupButtonSave = null;
  #rollupButtonDelete = null;
  #submitSavePoint = null;
  #submitDeletePoint = null;
  #getOffers = null;

  constructor({ point, destination, onEditClick, onSubmitSave, onSubmitDelete, getOffers }) {
    super();
    this.#initialPoint = point;
    this._setState({
      point: {...point},
    });
    this.#destination = destination;
    this.#onEditClick = onEditClick;
    this.#getOffers = getOffers;
    this.#submitSavePoint = onSubmitSave;
    this.#submitDeletePoint = onSubmitDelete;
    this._restoreHandlers();
  }

  get template() {
    return createTripEventsEditPointElements(this._state, this.#destination, this.#getOffers);
  }

  _restoreHandlers() {
    this.#rollupButton = this.element.querySelector('.event__rollup-btn');
    this.#rollupButtonSave = this.element.querySelector('.event__save-btn');
    this.#rollupButtonDelete = this.element.querySelector('.event__reset-btn');

    this.#rollupButton.addEventListener('click', this.#onClick);
    this.#rollupButtonSave.addEventListener('click', this.#onSubmitSaveHand);
    this.#rollupButtonDelete.addEventListener('click', this.#onSubmitDeleteHand);
    this.element.querySelector('.event__type-group').addEventListener('change', this.#eventTypeHandler);
    this.element.querySelector('.event__input--destination').addEventListener('change', this.#destinationTypeHandler);
  }

  #eventTypeHandler = (evt) => {
    evt.preventDefault();
    const newType = evt.target.value;

    this.updateElement({
      point: {
        ...this._state.point,
        type: newType
      },
    });
  };

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
        destination: typeDestination.id
      }
    });
  };


  #onClick = (evt) => {
    evt.preventDefault();
    this.reset();
    this.#onEditClick();
  };

  #onSubmitSaveHand = (evt) => {
    evt.preventDefault();
    this.#submitSavePoint();
  };

  #onSubmitDeleteHand = (evt) => {
    this.reset();
    evt.preventDefault();
    this.reset();
    this.#submitDeletePoint();
  };

  reset = () => {
    this.updateElement({
      point: {...this.#initialPoint},
    });
  };
}

