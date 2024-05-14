import { render, replace } from '../framework/render.js';
import NewTripEventsSortView from '../view/trip-events-sort-view';
import NewTripEventsListView from '../view/trip-events-list-view';
import NewTripEventsPointView from '../view/trip-events-points-view';
import NewTripEventsAddPointView from '../view/trip-events-add-point-view';
import NewTripEventsEditPointView from '../view/trip-events-edit-point-view';
//import EscapeHandler from '../tools/escape-handler.js';

export default class MainPresenter {
  #containerListComponent = new NewTripEventsListView();
  #boardContainer = null;
  #pointModel = null;
  // #escapeHandler = null;

  constructor({ boardContainer, pointModel }) {
    this.#boardContainer = boardContainer;
    this.#pointModel = pointModel;
    //this.#escapeHandler = new EscapeHandler(changeBackEditViewPoint);
  }

  init() {
    const points = this.#pointModel.points;
    const destination = this.#pointModel.destinations;
    const offersTest = this.#pointModel.offers;

    render(new NewTripEventsSortView(), this.#boardContainer);
    render(this.#containerListComponent, this.#boardContainer);
    render(new NewTripEventsAddPointView(), this.#containerListComponent.element);

    points.forEach((point) => {
      this.#renderPoint(point, destination, offersTest);
    });
  }

  #renderPoint(point, destination, offersTest) {
    const onEditClick = () => changeEditViewPoint();
    const onEditBackClick = () => changeBackEditViewPoint();
    const onSubmitSave = () => savePoint();
    const onSubmitDelete = () => deletePoint();

    const onEscKeydown = (evt) => {
      if (evt.key === 'Escape') {
        evt.preventDefault();
        changeBackEditViewPoint();
      }
    };

    const tripPointComponent = new NewTripEventsPointView(point, destination, offersTest, onEditClick, {
      getOffers: this.#pointModel.getOffersByType.bind(this.#pointModel),
    });
    const tripEditComponent = new NewTripEventsEditPointView(
      point,
      destination,
      offersTest,
      onEditBackClick,
      onSubmitSave,
      onSubmitDelete,
      { getOffers: this.#pointModel.getOffersByType.bind(this.#pointModel) },
    );

    function changeEditViewPoint() {
      replace(tripEditComponent, tripPointComponent);
      document.addEventListener('keydown', onEscKeydown);
      //this.#escapeHandler.enable();
    }

    function changeBackEditViewPoint() {
      replace(tripPointComponent, tripEditComponent);
      document.removeEventListener('keydown', onEscKeydown);
    }

    function savePoint() {
      replace(tripPointComponent, tripEditComponent);
      document.removeEventListener('keydown', onEscKeydown);
    }
    function deletePoint() {
      replace(tripPointComponent, tripEditComponent);
      document.removeEventListener('keydown', onEscKeydown);
    }

    render(tripPointComponent, this.#containerListComponent.element);
  }
}
