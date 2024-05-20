import { render, replace } from '../framework/render.js';
import EscapeHandler from '../tools/escape-handler.js';
import NewTripEventsPointView from '../view/trip-events-points-view';
import NewTripEventsEditPointView from '../view/trip-events-edit-point-view';
import {upadateItem} from '../utils/data.js';

export default class PointPresenter {
  #containerListComponent = null;
  #escapeHandler = new EscapeHandler(this.#changeBackEditViewPoint.bind(this));
  #point = null;
  #destination = null;
  #offersTest = null;
  #tripPointComponent = null;
  #tripEditComponent = null;
  #pointModel = null;
  #handlePointUpdate = null;

  constructor({ container, point, destination, pointModel,onPointUpdate }) {
    this.#containerListComponent = container;
    this.#point = point;
    this.#destination = destination;
    this.#pointModel = pointModel;
    this.#handlePointUpdate = onPointUpdate;
  }

  init() {

    this.#tripPointComponent = new NewTripEventsPointView({
      point:this.#point,
      destination:this.#destination,
      offers:this.#offersTest,
      onEditClick:this.#onEditClick,
      getOffers: this.#pointModel.getOffersByType.bind(this.#pointModel),
      onFavoritClick:this.onFavoritClick,
    });

    this.#tripEditComponent = new NewTripEventsEditPointView({
      point: this.#point,
      destination: this.#destination,
      onEditClick: this.#onEditBackClick,
      onSubmitSave: this.#onSubmitSave,
      onSubmitDelete: this.#onSubmitDelete,
      getOffers: this.#pointModel.getOffersByType.bind(this.#pointModel),});

    render(this.#tripPointComponent, this.#containerListComponent);
  }

  #changeEditViewPoint() {
    replace(this.#tripEditComponent, this.#tripPointComponent);
    this.#escapeHandler.enable();
  }

  #changeBackEditViewPoint() {
    replace(this.#tripPointComponent, this.#tripEditComponent);
    this.#escapeHandler.disable();
  }

  #savePoint() {
    replace(this.#tripPointComponent, this.#tripEditComponent);
    this.#escapeHandler.disable();
  }

  #deletePoint() {
    replace(this.#tripPointComponent, this.#tripEditComponent);
    this.#escapeHandler.disable();
  }

  updateIsFavorite() {
   // const updatePoint = upadateItem(this.#point,{isFavorite: !this.#point.isFavorite});
    //this.#handlePointUpdate(updatePoint);
  }

  #onEditClick = () => this.#changeEditViewPoint();
  #onEditBackClick = () => this.#changeBackEditViewPoint();
  #onSubmitSave = () => this.#savePoint();
  #onSubmitDelete = () => this.#deletePoint();
  onFavoritClick = () => this.updateIsFavorite();
}
