import { render, replace } from '../framework/render.js';
import EscapeHandler from '../tools/escape-handler.js';
import NewTripEventsPointView from '../view/trip-events-points-view';
import NewTripEventsEditPointView from '../view/trip-events-edit-point-view';
import {upadateItem} from '../utils/data.js';

export default class PointPresenter {
  #containerListComponent = null;
  #point = null;
  #destination = null;
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
    this.#renderPointsTest(this.#point,this.#destination,this.#pointModel.getOffersByType.bind(this.#pointModel));
  }

  #renderPointsTest(point,destination,getOffers) {
    const escapeHandler = new EscapeHandler(changeBackEditViewPoint.bind(this));
    const tripPointComponent = new NewTripEventsPointView({
      point,
      destination,
      onEditClick:() =>{
        changeEditViewPoint();
      },
      getOffers,
      onFavoritClick:() => {
        updateIsFavorite();
      },
    });
    const tripEditComponent = new NewTripEventsEditPointView({
      point,
      destination,
      onEditClick:() =>{
        changeBackEditViewPoint();
      },
      onSubmitSave: () => {
        savePoint();
      },
      onSubmitDelete: () => {
        deletePoint();
      },
      getOffers,
    });

    render(tripPointComponent, this.#containerListComponent);

    function changeEditViewPoint() {
      replace(tripEditComponent,tripPointComponent);
      escapeHandler.enable();
    }
    function changeBackEditViewPoint() {
      replace(tripPointComponent,tripEditComponent);
      escapeHandler.disable();
    }

    function savePoint() {
      replace(tripPointComponent,tripEditComponent);
      escapeHandler.disable();
    }

    function deletePoint() {
      replace(tripPointComponent,tripEditComponent);
      escapeHandler.disable();
    }

    function updateIsFavorite() {
      // const updatePoint = upadateItem(this.#point,{isFavorite: !this.#point.isFavorite});
       //this.#handlePointUpdate(updatePoint);
     }

  }
}
