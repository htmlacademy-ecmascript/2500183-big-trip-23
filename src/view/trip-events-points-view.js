import AbstractView from '../framework/view/abstract-view.js';
import dayjs from 'dayjs';
import {getDateCalc} from '../mock/util.js';

function createOffersList(offersList) {
  let str = '';
  if (offersList.length > 0) {
    offersList.forEach((element) => {
      str += `<li class="event__offer">
                <span class="event__offer-title">${element.title} &plus;&euro;&nbsp;</span>
                <span class="event__offer-price">${element.price}</span>
              </li>`;
    });
  }
  return str;
}

function createTripEventsPointElements(point,destination, offersTest) {
  const {type, isFavorite, dateFrom, dateTo, basePrice } = point;
  const currentDestination = destination.find((element) => element.id === point.destination);
  const typeOffers = offersTest.find((offelem) => offelem.type === point.type).offers;
  const pointOffer = typeOffers.filter((typeOffer) => point.offers.includes(typeOffer.id));

  return `<li class="trip-events__item">
  <div class="event">
    <time class="event__date" datetime="${dayjs(dateFrom).format('YYYY-MM-DD')}">${dayjs(dateFrom).format('MMM DD')}</time>
    <div class="event__type">
      <img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt="Event type icon">
    </div>
    <h3 class="event__title">${type} ${currentDestination.name}</h3>
    <div class="event__schedule">
      <p class="event__time">
        <time class="event__start-time" datetime="${dayjs(dateFrom)}">${dayjs(dateFrom).format('HH:mm')}</time>
        &mdash;
        <time class="event__end-time" datetime="${dayjs(dateTo)}">${dayjs(dateTo).format('HH:mm')}</time>
      </p>
      <p class="event__duration">${getDateCalc(dayjs(dateFrom), dayjs(dateTo))}</p>
    </div>
    <p class="event__price">
      &euro;&nbsp;<span class="event__price-value">${basePrice}</span>
    </p>
    <h4 class="visually-hidden">Offers:</h4>
    <ul class="event__selected-offers">
      ${createOffersList(pointOffer)}
    </ul>
    <button class="event__favorite-btn ${isFavorite ? 'event__favorite-btn--active' : ''} " type="button">
      <span class="visually-hidden">Add to favorite</span>
      <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
        <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
      </svg>
    </button>
    <button class="event__rollup-btn" type="button">
      <span class="visually-hidden">Open event</span>
    </button>
  </div>
</li>`;
}

export default class NewTripEventsPointView extends AbstractView {
  constructor(point,destination,offers){
    super();
    this.point = point;
    this.destination = destination;
    this.offers = offers;

  }

  get template() {
    return createTripEventsPointElements(this.point,this.destination,this.offers);
  }
}
