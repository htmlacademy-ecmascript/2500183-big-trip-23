import Observable from '../framework/observable.js';
import { UpdateType } from '../const.js';

export default class PointModel extends Observable {
  #points = [];
  #destinations = [];
  #offers = [];
  #types = [];
  #pointsApiService = null;

  constructor({ pointsApiService }) {
    super();

    this.#points = [];
    this.#destinations = [];
    this.#offers = [];

    this.#pointsApiService = pointsApiService;
  }

  async init() {
    let isError = false;

    try {
      const points = await this.#pointsApiService.points;
      this.#points = points.map(this.#adaptToClient);
      const offers = await this.#pointsApiService.offers;
      this.#offers = offers;

      const destinations = await this.#pointsApiService.destinations;
      this.#destinations = destinations;
    } catch (err) {
      isError = true;
      this.#points = [];
      this.#destinations = [];
      this.#offers = [];
    }

    this.#types = this.#offers.map((offer) => offer.type);
    this._notify(UpdateType.INIT, { isError });
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

  getOffersByCheckedType(point) {
    const offers = [];
    const typpedOffers = this.getOffersByType(point.type);

    point.offers.forEach((pointOfferID) => {
      const matchedOffer = typpedOffers.find((offer) => offer.id === pointOfferID);
      if (matchedOffer) {
        offers.push(matchedOffer);
      }
    });

    return offers;
  }

  async updatePoint(updateType, update) {
    const index = this.#points.findIndex((task) => task.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t update unexisting point');
    }

    try {
      const response = await this.#pointsApiService.updatePoint(update);
      const updatedPoint = this.#adaptToClient(response);

      this.#points = [...this.#points.slice(0, index), updatedPoint, ...this.#points.slice(index + 1)];

      this._notify(updateType, { point: updatedPoint, isError: false });
    } catch (err) {
      this._notify(updateType, { point: update, isError: true });
      throw new Error('Can\'t update point');
    }
  }

  async addPoint(updateType, update) {
    try {
      const response = await this.#pointsApiService.addPoint(update);
      const newPoint = this.#adaptToClient(response);

      this.#points = [newPoint, ...this.#points];

      this._notify(updateType, { point: newPoint, isError: false });
    } catch (err) {
      this._notify(updateType, { point: update, isError: true });
      throw new Error('Can\'t add point');
    }
  }

  async deletePoint(updateType, update) {
    const index = this.points.findIndex((point) => point.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t delete unexisting point');
    }

    try {
      await this.#pointsApiService.deletePoint(update);

      this.#points = [...this.points.slice(0, index), ...this.points.slice(index + 1)];

      this._notify(updateType, { point: update, isError: false });
    } catch (err) {
      this._notify(updateType, { point: update, isError: true });
      throw new Error('Can\'t delete point');
    }
  }

  #adaptToClient(point) {
    const adaptedPoint = {
      ...point,
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
