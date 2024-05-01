import { getRandomInt, getRandomArrayElement } from './util.js';
import {POINTS_TYPES,IS_FAVORITE,EventDate,offerList,DESTINATIONS_CITY} from './const.js';

const MIN_PRICE_OFFER = 20;
const MAX_PRICE_OFFER = 90;
const MIN_VALUE_POINT = 3;

const offerValue = getRandomArrayElement(offerList);

function createWaypoint() {
  return {
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
