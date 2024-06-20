import { render, RenderPosition } from '../framework/render.js';
import InfoHeaderView from '../view/info-header-view.js';

export default class HeaderPresenter {
  #boardContainer = null;

  constructor({ boardContainer }) {
    this.#boardContainer = boardContainer;
  }

  init() {
    render(new InfoHeaderView(), this.#boardContainer, RenderPosition.AFTERBEGIN);
  }
}
