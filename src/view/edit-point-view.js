import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';

import { DEFAULT_PICKER_OPTIONS } from '../const.js';
import { getCurrentDestination } from '../tools/destination-tools.js';
import { getTemplateEditPoint } from '../template/template-main-edit.js';

import dayjs from 'dayjs';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

function createTripEventsEditPointElements(state, destination, basePrice, getOffers) {
  const { type, dateFrom, dateTo, id, isDeleting, isDisabled, isSaving } = state.point;
  const currentDestination = getCurrentDestination(state.point.destination, destination);

  return getTemplateEditPoint(
    type,
    id,
    destination,
    currentDestination,
    dateFrom,
    dateTo,
    basePrice,
    state.point,
    getOffers,
    isDeleting,
    isDisabled,
    isSaving,
  );
}

export default class EditPointView extends AbstractStatefulView {
  #destination = null;
  #initialPoint = null;
  #onEditClick = null;
  #rollupButton = null;
  #rollupButtonSave = null;
  #rollupButtonDelete = null;

  #basePrice = 0;

  #getOffers = null;

  #eventTypeGroup = null;
  #eventInputDestination = null;
  #eventInputOffers = null;

  #datepickerStart = null;
  #handleDeleteClick = null;
  #handleEditSubmit = null;
  #eventInputPrice = null;

  constructor({ point, destination, onEditClick, getOffers, onDelete, onSubmitSave }) {
    super();
    this.#initialPoint = point;
    this.#basePrice = point.basePrice;

    this._setState({
      point: { ...point, isDeleting: false, isDisabled: false, isSaving: false },
    });

    this.#destination = destination;
    this.#onEditClick = onEditClick;
    this.#getOffers = getOffers;
    this.#handleDeleteClick = onDelete;
    this.#handleEditSubmit = onSubmitSave;

    this._restoreHandlers();
  }

  get template() {
    return createTripEventsEditPointElements(this._state, this.#destination, this.#basePrice, this.#getOffers);
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

    this.#eventInputOffers = this.element.querySelectorAll('.event__offer-checkbox');

    this.#eventInputDestination.addEventListener('change', this.#destinationTypeHandler);

    this.#eventInputOffers.forEach((checkbox) => checkbox.addEventListener('change', this.#changeOffersHandler.bind(this)));
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
        offers: this.#initialPoint.type === newType ? this.#initialPoint.offers : [],
        type: newType,
      },
    });
  };

  #destinationTypeHandler = (evt) => {
    evt.preventDefault();
    const newDestination = evt.target.value;
    const typeDestination = this.#destination.find((destination) => destination.name === newDestination);

    if (!typeDestination) {
      this.shake();
    }

    this.updateElement({
      point: {
        ...this._state.point,
        destination: typeDestination ? typeDestination.id : '',
      },
    });
  };

  #changeOffersHandler(evt) {
    const setOfOffers = new Set(this._state.point.offers);

    if (setOfOffers.has(evt.target.id) && !evt.target.checked) {
      setOfOffers.delete(evt.target.id);
    } else {
      setOfOffers.add(evt.target.id);
    }

    this.updateElement({
      point: {
        ...this._state.point,
        offers: Array.from(setOfOffers),
      },
    });
  }

  #dateFromChangeHandler = ([userDate]) => {
    const start = dayjs(userDate);
    const finish = dayjs(this._state.point.dateTo);

    if (start >= finish) {
      this._state.point.dateTo = start.add(5, 'minute').toString();
    }

    this._state.point.dateFrom = userDate;
    this.updateElement({
      point: {
        ...this._state.point,
        dateFrom: this._state.point.dateFrom,
        dateTo: this._state.point.dateTo,
      },
    });
  };

  #dateToChangeHandler = ([userDate]) => {
    this._state.point.dateTo = userDate;
    this.updateElement({
      point: {
        ...this._state.point,
        dateFrom: this._state.point.dateFrom,
        dateTo: this._state.point.dateTo,
      },
    });
  };

  #priceInputHandler = (evt) => {
    evt.preventDefault();
    this.#basePrice = +evt.target.value;
  };

  #setDatepickerStart() {
    this.#datepickerStart = flatpickr(this.element.querySelector('[name ="event-start-time"]'), {
      ...DEFAULT_PICKER_OPTIONS,
      defaultDate: this._state.point.dateFrom,
      minDate: 'today',
      onChange: this.#dateFromChangeHandler,
    });
  }

  #setDatepickerEnd() {
    this.#datepickerStart = flatpickr(this.element.querySelector('[name ="event-end-time"]'), {
      ...DEFAULT_PICKER_OPTIONS,
      defaultDate: this._state.point.dateTo,
      minDate: this._state.point.dateFrom,
      onChange: this.#dateToChangeHandler,
    });
  }

  #onClick = (evt) => {
    evt.preventDefault();
    this.resetStateView();
    this.#onEditClick();
  };

  #onSubmitSaveHand = (evt) => {
    evt.preventDefault();
    this.setSaving();

    if (this.#handleEditSubmit) {
      this.clearStatePoint();
      this._state.point.basePrice = this.#basePrice;

      this.#handleEditSubmit({ ...this._state });
    }
  };

  #onSubmitDeleteHand = (evt) => {
    evt.preventDefault();
    this.setDeleting();

    if (this.#handleDeleteClick) {
      this.#handleDeleteClick(this._state.point);
      this.clearStatePoint();
    }
  };

  resetStateView = () => {
    this.updateElement({
      point: { ...this.#initialPoint },
    });
  };

  setSaving = () => {
    this.updateElement({
      point: {
        ...this._state.point,
        isDisabled: true,
        isSaving: true,
      },
    });
  };

  setDeleting = () => {
    this.updateElement({
      point: {
        ...this._state.point,
        isDeleting: true,
        isDisabled: true,
      },
    });
  };

  clearStatePoint = () => {
    delete this._state.point.isDisabled;
    delete this._state.point.isSaving;
    delete this._state.point.isDeleting;
  };

  defaultStatePoint = () => {
    this.updateElement({
      point: { ...this._state.point, isDeleting: false, isDisabled: false, isSaving: false },
    });
  };
}
