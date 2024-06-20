/* eslint-disable camelcase */
const EVENT_TYPES = ['Taxi', 'Bus', 'Train', 'Ship', 'Drive', 'Flight', 'Check-in', 'Sightseeing', 'Restaurant'];

const DEFAULT_PICKER_OPTIONS = {
  static: true,
  dateFormat: 'd/m/y H:i',
  enableTime: true,
  time_24hr: true,
};

const SortType = {
  DAY: 'day',
  EVENT: 'event',
  TIME: 'time',
  PRICE: 'price',
  OFFERS: 'offers',
};

const defaultPoint = {
  basePrice: 0,
  destination: '',
  isFavorite: false,
  offers: [],
  type: 'flight',
};

const UserAction = {
  UPDATE_POINT: 'UPDATE_POINT',
  ADD_POINT: 'ADD_POINT',
  DELETE_POINT: 'DELETE_POINT',
  CANCEL: 'CANCEL',
};

const UpdateType = {
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR',
  INIT: 'INIT',
};


const DateFormat = {
  DATE_MONTH: 'MMM D',
  MONTH_DAY: 'D MMM',
  DATE: 'YYYY-MM-DD',
  TIME: 'HH:mm',
  DATE_TIME_SYSTEM: 'YYYY-MM-DDTHH:mm',
  DATE_TIME: 'DD/MM/YY HH:mm',
  DAY: 'DD[d] HH[h] mm[m]',
  HOURS: 'HH[h] mm[m]',
  MINUTES: 'mm[m]',
  DATE_PICKER: 'd/m/y H:i',
};

const TimeLimit = {
  LOWER_LIMIT: 350,
  UPPER_LIMIT: 1000,
};

const ModeAdded = {
  DEFAULT: 'DEFAULT',
  ADDED: 'ADDED',
};

export { SortType, EVENT_TYPES, defaultPoint, UpdateType, UserAction, DateFormat, TimeLimit, ModeAdded, DEFAULT_PICKER_OPTIONS };
