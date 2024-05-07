import {testPoints} from '../points-live.js';
import {destination} from '../destinations.js';
import {offers} from '../offers-my.js';


export default class PointModel {
  constructor() {
    this.points = [];
    this.destination = [];
    this.offers = [];
  }

  init() {
    this.points = testPoints;
    this.destination = destination;
    this.offers = offers;
  }

  getPoints() {
    return this.points;
  }

  getDestinations() {
    return this.destination;
  }

  getOffers() {
    return this.offers;
  }
}
