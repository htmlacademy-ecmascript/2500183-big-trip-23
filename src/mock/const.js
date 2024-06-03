const SortType = {
  DAY: 'day',
  EVENT: 'event',
  TIME: 'time',
  PRICE: 'price',
  OFFERS: 'offers',
};

const EVENT_TYPES = ['Taxi', 'Bus', 'Train', 'Ship', 'Drive', 'Flight', 'Check-in', 'Sightseeing', 'Restaurant'];


const defaultPoint = {
  id: '',
  basePrice: 0,
  dateFrom: '2024-05-14T07:27:07.173Z',
  dateTo: '2024-05-15T08:12:07.173Z',
  isFavorite: false,
  offers: [],
  type: EVENT_TYPES[0],
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
};

const UpdateType = {
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR',
};

export { SortType, EVENT_TYPES, defaultPoint, defaultDestination, UpdateType, UserAction, };
