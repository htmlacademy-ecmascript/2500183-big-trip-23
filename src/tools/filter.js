import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';

dayjs.extend(duration);

const FiltersTypes = {
  EVERYTHING: 'everything',
  FUTURE: 'future',
  PRESENT: 'present',
  PAST: 'past',
};

const isPointFuture = ({ dateFrom }) => dayjs().isBefore(dateFrom);
const isPointPresent = ({ dateFrom, dateTo }) => dayjs().isAfter(dateFrom) && dayjs().isBefore(dateTo);
const isPointPast = ({ dateTo }) => dayjs().isAfter(dateTo);

const filterBy = {
  [FiltersTypes.EVERYTHING]: (points) => [...points],
  [FiltersTypes.FUTURE]: (points) => points.filter((point) => isPointFuture(point)),
  [FiltersTypes.PRESENT]: (points) => points.filter((point) => isPointPresent(point)),
  [FiltersTypes.PAST]: (points) => points.filter((point) => isPointPast(point)),
};

const TripEmptyMessages = {
  [FiltersTypes.EVERYTHING]: 'Click New Event to create your first point',
  [FiltersTypes.FUTURE]: 'There are no future events now',
  [FiltersTypes.PRESENT]: 'There are no present events now',
  [FiltersTypes.PAST]: 'There are no past events now',
};

export { TripEmptyMessages, FiltersTypes, filterBy };
