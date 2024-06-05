import { render, RenderPosition } from '../framework/render.js';
import NewTripInfoHeader from '../view/trip-info-header';

export default class HeaderPresenter {
  #boardContainer = null;
  constructor({ boardContainer}) {
    this.#boardContainer = boardContainer;
  }

  init() {
    render(new NewTripInfoHeader(), this.#boardContainer, RenderPosition.AFTERBEGIN);
  }
}
