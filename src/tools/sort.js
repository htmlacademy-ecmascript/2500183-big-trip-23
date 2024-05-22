import {SortType} from '../mock/const.js';

const getTimeDifferens = ({dateFrom,dateTo}) => (new Date(dateTo).getTime() - new Date(dateFrom)).getTime();

const sortPointBy = {
  [SortType.DAY]: (points) => [...points],
  [SortType.TIME]: (points) => [...points].sort((a,b) => getTimeDifferens(b) - getTimeDifferens(a)),
  [SortType.PRICE]:(points) => [...points].sort((a,b) => b.basePrice - a.basePrice),
};

export const sortPoints = (points,sortType) => sortPointBy[sortType](points);
