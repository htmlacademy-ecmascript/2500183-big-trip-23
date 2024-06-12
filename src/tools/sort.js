import { SortType } from '../mock/const.js';

const sortBy = {
  [SortType.DAY]: (points) => [...points].sort((firstPoint, secondPoint) => new Date(firstPoint.dateFrom) - new Date(secondPoint.dateFrom)),
  [SortType.TIME]: (points) => [...points].sort((firstPoint, secondPoint) => {
    const durationFirstPoint = new Date(firstPoint.dateTo).getTime() - new Date(firstPoint.dateFrom).getTime();
    const durationSecondPoint = new Date(secondPoint.dateTo).getTime() - new Date(secondPoint.dateFrom).getTime();
    return durationSecondPoint - durationFirstPoint;
  }),
  [SortType.PRICE]: (points) => [...points].sort((firstPoint, secondPoint) => secondPoint.basePrice - firstPoint.basePrice),
};

export const sortPoints = (points, sortType) => sortBy[sortType](points);

