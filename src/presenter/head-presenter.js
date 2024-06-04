import { render, RenderPosition } from '../framework/render.js';
import NewTripInfoHeader from '../view/trip-info-header';

export default class HeaderPresenter {
  #boardContainer = null;
  #headerContainer = null;
  constructor({ boardContainer, headerContainer }) {
    this.#boardContainer = boardContainer;
    this.#headerContainer = headerContainer;
  }

  init() {
    render(new NewTripInfoHeader(), this.#boardContainer, RenderPosition.AFTERBEGIN);
  }
}
