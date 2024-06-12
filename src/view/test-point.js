import dayjs from 'dayjs';
import AbstractView from '../framework/view/abstract-view.js';
import

const POINT_DATE_FORMAT = 'MMM D';

const timeType = {
  MINUTES: 60,
  HOURS: 24,
};

const displayEventTime = (time) => time ? dayjs(time).format(POINT_DATE_FORMAT) : '';
const displayEventDate = (date) => date ? dayjs(date).format(POINT_DATE_FORMAT) : '';

const displayTime = (time) => time ? dayjs(time).format(DateFormat.TIME) : '';


const getDuration = (dateFrom, dateTo) => {
  const timeDurations = [
    {sign:'D', value: dayjs(dateTo).diff(dateFrom, 'd')},
    {sign: 'H', value: dayjs(dateTo).diff(dateFrom, 'h') % timeType.HOURS},
    {sign: 'M', value: dayjs(dateTo).diff(dateFrom, 'm') % timeType.MINUTES},
  ];
  const resultDurations = [];
  for (let i = 0; i < timeDurations.length; i++) {
    if (timeDurations[i].value && timeDurations[i].value < 10) {
      resultDurations.push(`0${timeDurations[i].value}${timeDurations[i].sign} `);
    } else if (timeDurations[i].value && timeDurations[i].value >= 10) {
      resultDurations.push(`${timeDurations[i].value}${timeDurations[i].sign} `);
    } else if (!timeDurations[i].value && resultDurations.length !== 0) {
      resultDurations.push(`00${timeDurations[i].sign} `);
    }
  }
  return resultDurations.join('');
};

const createTripPointTemplate = (offers, destinations, point) => {
  const {dateFrom, dateTo, isFavorite, basePrice, type} = point;
  const typeOffers = offers.find((elem) => elem.type === point.type).offers;
  const pointOffers = typeOffers.filter((typeOffer) => point.offers.includes(typeOffer.id));
  const pointDestination = destinations.find((elem) => elem.id === point.destination) || {};
  const {name = ''} = pointDestination;

  const createOffersData = (title, price) =>
    `<li class="event__offer">
    <span class="event__offer-title">${title}</span>
    &plus;&euro;&nbsp;
    <span class="event__offer-price">${price}</span>
  </li>`;

  const createFavoriteData = () => isFavorite ? 'event__favorite-btn--active' : '';

  return (`<li class="trip-events__item">
    <div class="event">
      <time class="event__date" datetime="${dateFrom}">${displayEventDate(dateFrom)}</time>
      <div class="event__type">
        <img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt="Event type icon">
      </div>
      <h3 class="event__title">${type} ${name}</h3>
      <div class="event__schedule">
        <p class="event__time">
          <time class="event__start-time" datetime=${dateFrom}>${displayEventTime(dateFrom)}</time>
          &mdash;
          <time class="event__end-time" datetime=${dateTo}>${displayEventTime(dateTo)}</time>
        </p>
        <p class="event__duration">${getDuration(dateFrom, dateTo)}</p>
      </div>
      <p class="event__price">
        &euro;&nbsp;<span class="event__price-value">${basePrice}</span>
      </p>
      <h4 class="visually-hidden">Offers:</h4>
      <ul class="event__selected-offers">
        ${pointOffers ? pointOffers.map((offer) => createOffersData(offer.title, offer.price)).join('') : ''}
      </ul>
      <button class="event__favorite-btn ${createFavoriteData()}" type="button">
        <span class="visually-hidden">Add to favorite</span>
        <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
          <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
        </svg>
      </button>
      <button class="event__rollup-btn" type="button">
        <span class="visually-hidden">Open event</span>
      </button>
    </div>
  </li>`);
};

export default class TripPointView extends AbstractView {

  #offers = null;
  #destinations = null;
  #point = null;
  #handleTripEditClick = null;
  #handleFavoriteClick = null;

  constructor({offers, destinations, point, onTripEditClick, onFavoriteClick}) {
    super();
    this.#offers = offers;
    this.#destinations = destinations;
    this.#point = point;
    this.#handleTripEditClick = onTripEditClick;
    this.#handleFavoriteClick = onFavoriteClick;

    this.element?.querySelector('.event__rollup-btn')
      ?.addEventListener('click', this.#onEventRollButtonClick);

    this.element?.querySelector('.event__favorite-btn')
      ?.addEventListener('click', this.#onFavoriteButtonClick);
  }

  get template() {
    return createTripPointTemplate(this.#offers, this.#destinations, this.#point);
  }

  #onEventRollButtonClick = (evt) => {
    evt.preventDefault();
    this.#handleTripEditClick();
  };

  #onFavoriteButtonClick = (evt) => {
    evt.preventDefault();
    this.#handleFavoriteClick();
  };
}

