import { getRandomInt, getRandomArrayElement, getIdNumber } from './util.js';
import {POINTS_TYPES,IS_FAVORITE,EventDate,offerList,DESTINATIONS_CITY} from './const.js';

const MIN_ID_VALUE = 1;
const MAX_ID_VALUE = 100;

const MIN_PRICE_OFFER = 20;
const MAX_PRICE_OFFER = 90;
const MIN_VALUE_POINT = 3;

const generatePointId = getIdNumber(MIN_ID_VALUE, MAX_ID_VALUE);

const offerValue = getRandomArrayElement(offerList);

function createWaypoint() {
  return {
    id:generatePointId(),
    type: getRandomArrayElement(POINTS_TYPES),
    favoriteType: getRandomArrayElement(IS_FAVORITE),
    destination: getRandomArrayElement(DESTINATIONS_CITY),
    timeStart: EventDate.START,
    timeEnd: EventDate.END,
    date:EventDate.DATE,
    price:  getRandomInt(MIN_PRICE_OFFER,MAX_PRICE_OFFER),
    eventOffer: offerValue.name,
    eventOfferPrice: offerValue.price
  };
}

function generateWaypoint() {
  return Array.from({length:MIN_VALUE_POINT},createWaypoint);
}

export {generateWaypoint};
