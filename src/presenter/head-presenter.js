import { render, RenderPosition } from '../framework/render.js';
import NewTripInfoHeader from '../view/trip-info-header';
import NewTripFiltersView from '../view/trip-filters-view';

export default class HeaderPresenter {
  constructor({boardContainer,headerContainer}) {
    this.boardContainer = boardContainer;
    this.headerContainer = headerContainer;
  }

  init() {
    render(new NewTripFiltersView(), this.headerContainer);
    render(new NewTripInfoHeader(), this.boardContainer, RenderPosition.AFTERBEGIN);
  }
}
