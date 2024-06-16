const SortType = {
  DAY: 'day',
  EVENT: 'event',
  TIME: 'time',
  PRICE: 'price',
  OFFERS: 'offers',
};

const EVENT_TYPES = ['Taxi', 'Bus', 'Train', 'Ship', 'Drive', 'Flight', 'Check-in', 'Sightseeing', 'Restaurant'];

export const upFirst = (str) => str[0].toUpperCase() + str.slice(1);

const defaultPoint = {
  basePrice: 0,
  destination: '',
  isFavorite: false,
  offers: [],
  type: 'flight',
};

const defaultDestination = {
  id: 'baedd0da-d74e-45ef-ad35-ee37057c3242',
  description: 'Kioto - with an embankment of a mighty river as a centre of attraction',
  name: 'Kioto',
  pictures: [
    {
      src: 'https://23.objects.htmlacademy.pro/static/destinations/17.jpg',
      description: 'Kioto with crowded streets',
    },
  ],
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

const timeType = {
  MINUTES: 60,
  HOURS: 24,
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
  DATE_PICKER: 'd/m/y H:i'
};

export { SortType, EVENT_TYPES, defaultPoint, defaultDestination, UpdateType, UserAction,timeType,DateFormat};
