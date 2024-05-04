import { getRandomInt, getRandomArrayElement } from './util.js';
import { POINTS_TYPES, EventDate, offerList, DESTINATIONS_CITY, DESCRIPTION_POINT } from './const.js';

const MIN_PRICE_OFFER = 20;
const MAX_PRICE_OFFER = 90;
const MIN_VALUE_POINT = 3;

const offerValue = getRandomArrayElement(offerList);

function createWaypoint() {
  return {
    id: crypto.randomUUID(),
    type: getRandomArrayElement(POINTS_TYPES),
    favoriteType: Math.random() < 0.5,
    destination: getRandomArrayElement(DESTINATIONS_CITY),
    timeStart: EventDate.START,
    timeEnd: EventDate.END,
    date: EventDate.DATE,
    price: getRandomInt(MIN_PRICE_OFFER, MAX_PRICE_OFFER),
    eventOffer: offerValue.name,
    eventOfferPrice: offerValue.price,
  };
}

function createAddWaipoint() {
  return {
    id: crypto.randomUUID(),
    descriptionPoint: getRandomArrayElement(DESCRIPTION_POINT),
    srcImage: `https://loremflickr.com/248/152?random=${getRandomInt(1, 9)}`,
  };
}

function generateWaypoint() {
  return Array.from({ length: MIN_VALUE_POINT }, createWaypoint);
}

function generateAddWaypoint() {
  return Array.from({ length: 1 }, createAddWaipoint);
}

export { generateWaypoint, generateAddWaypoint };
