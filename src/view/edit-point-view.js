import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';

import { DEFAULT_PICKER_OPTIONS } from '../const.js';
import {getCurrentDestination} from'../tools/destination-tools.js';
import {getTemplateEditPoint} from '../template/template-main-edit.js';

import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

function createTripEventsEditPointElements(state, destination, getOffers) {
  const { type, dateFrom, dateTo, basePrice, id,isDeleting,isDisabled,isSaving } = state.point;
  const currentDestination = getCurrentDestination(state.point.destination,destination);

  return getTemplateEditPoint(type,id,destination,currentDestination,dateFrom,dateTo,basePrice,state.point,getOffers,isDeleting,isDisabled,isSaving);

}

export default class EditPointView extends AbstractStatefulView {
  #destination = null;
  #initialPoint = null;
  #onEditClick = null;
  #rollupButton = null;
  #rollupButtonSave = null;
  #rollupButtonDelete = null;
  #getOffers = null;
  #eventTypeGroup = null;
  #eventInputDestination = null;
  #datepickerStart = null;
  #handleDeleteClik = null;
  #handleEditSubmit = null;
  #eventInputPrice = null;

  constructor({ point, destination, onEditClick, getOffers, onDelete, onSubmitSave }) {
    super();
    this.#initialPoint = point;
    this._setState({
      point: { ...point,
        isDeleting: false,
        isDisabled: false,
        isSaving: false,
      },
    });
    this.#destination = destination;
    this.#onEditClick = onEditClick;
    this.#getOffers = getOffers;
    this.#handleDeleteClik = onDelete;
    this.#handleEditSubmit = onSubmitSave;
    this._restoreHandlers();
  }

  get template() {
    return createTripEventsEditPointElements(this._state, this.#destination, this.#getOffers);
  }

  _restoreHandlers() {
    this.#rollupButton = this.element.querySelector('.event__rollup-btn');
    this.#rollupButtonSave = this.element.querySelector('.event__save-btn');
    this.#rollupButtonDelete = this.element.querySelector('.event__reset-btn');
    this.#eventTypeGroup = this.element.querySelector('.event__type-group');
    this.#eventInputDestination = this.element.querySelector('.event__input--destination');
    this.#eventInputPrice = this.element.querySelector('.event__input--price');

    this.#rollupButton.addEventListener('click', this.#onClick);
    this.#rollupButtonSave.addEventListener('click', this.#onSubmitSaveHand);
    this.#rollupButtonDelete.addEventListener('click', this.#onSubmitDeleteHand);
    this.#eventTypeGroup.addEventListener('change', this.#eventTypeHandler);
    this.#eventInputDestination.addEventListener('change', this.#destinationTypeHandler);

    this.#eventInputPrice.addEventListener('change', this.#priceInputHandler);

    this.#setDatepickerStart();
    this.#setDatepickerEnd();
  }

  #eventTypeHandler = (evt) => {
    evt.preventDefault();
    const newType = evt.target.value;

    this.updateElement({
      point: {
        ...this._state.point,
        type: newType,
      },
    });
  };

  #destinationTypeHandler = (evt) => {
    evt.preventDefault();
    const newDestination = evt.target.value;

    const typeDestination = this.#destination.find((destination) => destination.name === newDestination);
    if (!typeDestination) {
      return;
    }
    this.updateElement({
      point: {
        ...this._state.point,
        destination: typeDestination.id,
      },
    });
  };

  #onClick = (evt) => {
    evt.preventDefault();
    this.resetStateVue();
    this.#onEditClick();
  };

  #onSubmitSaveHand = (evt) => {
    evt.preventDefault();
    if (this.#handleEditSubmit) {
      delete this._state.point.isDisabled;//выделить в отдельный метод
      delete this._state.point.isSaving;//выделить в отдельный метод
      delete this._state.point.isDeleting;
      this.#handleEditSubmit({ ...this._state });
    }
    this.resetStateVue();
  };

  #onSubmitDeleteHand = (evt) => {
    evt.preventDefault();
    this.#handleDeleteClik(this._state.point);
  };

  #dateFromChangeHandler = ([userDate]) => {
    this.updateElement({
      point: {
        ...this._state.point,
        dateFrom: userDate,
      },
    });
  };

  #dateToChangeHandler = ([userDate]) => {
    this.updateElement({
      point: {
        ...this._state.point,
        dateTo: userDate,
      },
    });
  };

  #priceInputHandler = (evt) => {
    const userPrice = evt.target.value;
    this.updateElement({
      point: {
        ...this._state.point,
        basePrice: userPrice,
      },
    });
  };

  #setDatepickerStart() {
    this.#datepickerStart = flatpickr(this.element.querySelector('[name ="event-start-time"]'), {
      ...DEFAULT_PICKER_OPTIONS,
      defaultDate: this._state.point.dateFrom,
      maxDate: this._state.point.dateFrom,
      onChange: this.#dateFromChangeHandler,
    });
  }

  #setDatepickerEnd() {
    this.#datepickerStart = flatpickr(this.element.querySelector('[name ="event-end-time"]'), {
      ...DEFAULT_PICKER_OPTIONS,
      defaultDate: this._state.point.dateTo,
      minDate: this._state.point.dateTo,
      onChange: this.#dateToChangeHandler,
    });
  }

  resetStateVue = () => {
    this.updateElement({
      point: { ...this.#initialPoint },
    });
  };
}
