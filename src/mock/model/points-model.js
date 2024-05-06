import {testPoints} from '../points-live.js';
import {destination} from '../destinations.js';

export default class PointModel {
  constructor() {
    this.points = [];
    this.destination = [];
  }

  init() {
    this.points = testPoints;
    this.destination = destination;
  }

  getPoints() {
    return this.points;
  }

  getDestinations() {
    return this.destination;
  }
}
