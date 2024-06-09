import { testPoints } from '../points-live.js';
import { destination } from '../destinations.js';
import { offers } from '../offers-my.js';
import Observable from '../../framework/observable.js';

export default class PointModel extends Observable {
  #points = [];
  #destinations = [];
  #offers = [];
  #types = [];
  #pointsApiService = null;

  constructor({pointsApiService}) {
    super();

    this.#points = [];
    this.#destinations = [];
    this.#offers = [];

    this.#pointsApiService = pointsApiService;

    this.#pointsApiService.points.then((point) => console.log(point));

  }

  init() {
    this.#points = testPoints;
    this.#destinations = destination;
    this.#offers = offers;

    this.#types = this.#offers.map((offer) => offer.type);
  }

  get types() {
    return this.#types;
  }

  get points() {
    return this.#points;
  }

  get destinations() {
    return this.#destinations;
  }

  get offers() {
    return this.#offers;
  }

  getDestinationById(id) {
    return this.destinations.find((element) => element.id === id);
  }

  getDestinationByName(name) {
    return this.destinations.find((element) => element.name === name);
  }

  getOffersByType(type) {
    return this.#offers.find((offer) => offer.type === type).offers || [];
  }

  updatePoint(updateType, update) {
    const index = this.#points.findIndex((task) => task.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t update unexisting point');
    }

    this.#points = [...this.#points.slice(0, index), update, ...this.#points.slice(index + 1)];

    this._notify(updateType, update);
  }

  addPoint(updateType, update) {
    update.id = crypto.randomUUID();
    this.#points = [update, ...this.#points];

    this._notify(updateType, update);
  }

  deletePoint(updateType, update) {
    const index = this.#points.findIndex((point) => point.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t delete unexisting point');
    }

    this.#points = [...this.#points.slice(0, index), ...this.#points.slice(index + 1)];

    this._notify(updateType);
  }
}
