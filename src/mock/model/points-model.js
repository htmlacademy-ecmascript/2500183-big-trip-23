import Observable from '../../framework/observable.js';
import {UpdateType, UserAction } from '../const.js';

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
  }

  async init() {
    try {
      const points = await this.#pointsApiService.points;
      this.#points = points.map(this.#adaptToClient);
      console.log(this.#points);
      const offers = await this.#pointsApiService.offers;
      this.#offers = offers;

      const destinations = await this.#pointsApiService.destinations;
      this.#destinations = destinations;

    }catch(err) {
      this.#points = [];
    }
    //this.#points = testPoints;
    //this.#destinations = destination;
    //this.#offers = offers;

    this.#types = this.#offers.map((offer) => offer.type);
    this._notify(UpdateType.INIT);
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

  #adaptToClient(point) {
    const adaptedPoint = {...point,
      basePrice: point['base_price'],
      dateFrom: point['date_from'] !== null ? new Date(point['date_from']) : point['date_from'],
      dateTo: point['date_to'] !== null ? new Date(point['date_to']) : point['date_to'],
      isFavorite: point['is_favorite'],
    };

    delete adaptedPoint['base_price'];
    delete adaptedPoint['date_from'];
    delete adaptedPoint['date_to'];
    delete adaptedPoint['is_favorite'];

    return adaptedPoint;
  }
}
