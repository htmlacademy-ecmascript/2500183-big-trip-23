import { testPoints } from '../points-live.js';
import { destination } from '../destinations.js';
import { offers } from '../offers-my.js';
import Observable from '../../framework/observable.js';


export default class PointModel extends Observable {

  #points = null;
  #destination = null;
  #offers = null;
  constructor() {
    super();
    this.#points = [];
    this.#destination = [];
    this.#offers = [];
  }

  init() {
    this.#points = testPoints;
    this.#destination = destination;
    this.#offers = offers;
  }

  get points() {
    return this.#points;
  }

  get destinations() {
    return this.#destination;
  }

  get offers() {
    return this.#offers;
  }

  getOffersByType(type) {
    return this.#offers.find((offer) => offer.type === type).offers;
  }
}
