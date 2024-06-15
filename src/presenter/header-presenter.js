import { render, RenderPosition } from '../framework/render.js';
import InfoHeader from '../view/info-header.js';

export default class HeaderPresenter {
  #boardContainer = null;

  constructor({ boardContainer }) {
    this.#boardContainer = boardContainer;
  }

  init() {
    render(new InfoHeader(), this.#boardContainer, RenderPosition.AFTERBEGIN);
  }
}
