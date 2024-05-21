import { render, replace,remove } from '../framework/render.js';
import EscapeHandler from '../tools/escape-handler.js';
import NewTripEventsPointView from '../view/trip-events-points-view';
import NewTripEventsEditPointView from '../view/trip-events-edit-point-view';
import {updateItem} from '../utils/data.js';

export default class PointPresenter {
  #containerListComponent = null;
  #destination = null;
  #pointModel = null;
  #handlePointUpdates = null;
  #point = [];
  #tripPointComponent = null;
  #tripEditComponent = null;
  #escapeHandler = null;

  constructor({ container,destination, pointModel,onPointUpdate }) {
    this.#containerListComponent = container;
    this.#destination = destination;
    this.#pointModel = pointModel;
    this.#handlePointUpdates = onPointUpdate;
  }

  init(myTest) {
    this.#renderPointsTest(myTest,this.#destination,this.#pointModel.getOffersByType.bind(this.#pointModel));
  }

  #renderPointsTest(point,destination,getOffers) {
    this.#point = point;

    const prevPointComponent = this.#tripPointComponent;
    const prevPointEditComponent = this.#tripEditComponent;

    this.#escapeHandler = new EscapeHandler(this.#changeBackEditViewPoint.bind(this.#changeBackEditViewPoint));

    this.#tripPointComponent = new NewTripEventsPointView({
      point:this.#point,
      destination,
      onEditClick:() =>{
        this.#changeEditViewPoint();
      },
      getOffers,
      onFavoritClick:() => {
        this.#updateFavorite(this.#point);
      },
    });
    this.#tripEditComponent = new NewTripEventsEditPointView({
      point,
      destination,
      onEditClick:() =>{
        this.#changeBackEditViewPoint();
      },
      onSubmitSave: () => {
        this.#savePoint();
      },
      onSubmitDelete: () => {
        this.#deletePoint();
      },
      getOffers,
    });

    if (prevPointComponent === null || prevPointEditComponent === null) {
      render(this.#tripPointComponent, this.#containerListComponent);
      return;
    }

    if (this.#containerListComponent.contains(prevPointComponent.element)) {
      replace(this.#tripPointComponent, prevPointComponent);
    }

    if (this.#containerListComponent.contains(prevPointComponent.element)) {
      replace(this.#tripPointComponent, prevPointEditComponent);
    }

    remove(prevPointComponent);
    remove(prevPointEditComponent);
  }


  #changeEditViewPoint = () => {
    replace(this.#tripEditComponent,this.#tripPointComponent);
    this.#escapeHandler.enable();
  };

  #changeBackEditViewPoint = () => {
    replace(this.#tripPointComponent,this.#tripEditComponent);
    this.#escapeHandler.disable();
  };

  #savePoint = () => {
    replace(this.#tripPointComponent,this.#tripEditComponent);
    this.#escapeHandler.disable();
  };

  #deletePoint = () => {
    replace(this.#tripPointComponent,this.#tripEditComponent);
    this.#escapeHandler.disable();
  };

  #updateFavorite(point) {
    const updatePoint = updateItem(point,{isFavorite:!point.isFavorite});
    this.#handlePointUpdates(updatePoint);
  }
}
