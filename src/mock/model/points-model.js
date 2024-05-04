import {testPoints} from '../points-live.js';

export default class PointModel {
  constructor() {
    this.points = [];
  }

  init() {
    this.points = testPoints;
  }

  getPoints() {
    return this.points;
  }
}
