import dayjs from 'dayjs';
import { SortType } from '../mock/const.js';

const getTimeDifferens = ({ dateFrom, dateTo }) => new Date(dateTo).getTime() - new Date(dateFrom).getTime();

const sortPointBy = {
  [SortType.DAY]: (points) => points.toSorted((a, b) => dayjs(a.dateFrom).diff(b.dateFrom)),
  [SortType.EVENT]: (points, pointModel) => points.toSorted((a, b) => {
    const eventNameA = `${a.type} ${pointModel.getDestinationById(a.destination)?.name}`;
    const eventNameB = `${b.type} ${pointModel.getDestinationById(b.destination)?.name}`;

    return eventNameA.localeCompare(eventNameB);
  }),
  [SortType.TIME]: (points) => points.toSorted((a, b) => getTimeDifferens(b) - getTimeDifferens(a)),
  [SortType.PRICE]: (points) => points.toSorted((a, b) => b.basePrice - a.basePrice),
};

export const sortPoints = (sortType, points, pointModel) => sortPointBy[sortType](points, pointModel);
