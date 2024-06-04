import { render, RenderPosition } from '../framework/render.js';
import NewTripInfoHeader from '../view/trip-info-header';

export default class HeaderPresenter {
  #boardContainer = null;
  #buttonAddPoint = null;
  constructor({ boardContainer}) {
    this.#boardContainer = boardContainer;
    this.#buttonAddPoint = this.#boardContainer.querySelector('.trip-main__event-add-btn');

    this.#buttonAddPoint.addEventListener('click', this.#clickAddPoint);
  }

  init() {
    render(new NewTripInfoHeader(), this.#boardContainer, RenderPosition.AFTERBEGIN);
  }

  #clickAddPoint() {
    console.log('привет');
    //render(new NewTripEventsEditPointView(),this.#boardContainer);
  }
}
