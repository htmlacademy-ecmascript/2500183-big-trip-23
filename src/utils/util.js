import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import { DateFormat } from '../const.js';

dayjs.extend(duration);

const calculateDuration = (dateFrom, dateTo) => {
  const start = dayjs(dateFrom).startOf('minute');
  const end = dayjs(dateTo).startOf('minute');
  const differenceInMilliseconds = end.diff(start);
  const eventDuration = dayjs.duration(differenceInMilliseconds);
  const days = Math.floor(eventDuration.asDays());
  const hours = eventDuration.hours();
  const minutes = eventDuration.minutes();

  if (days > 0) {
    return `${days.toString().padStart(2, '0')}D ${hours.toString().padStart(2, '0')}H ${minutes.toString().padStart(2, '0')}M`;
  } else if (hours > 0) {
    return `${hours.toString().padStart(2, '0')}H ${minutes.toString().padStart(2, '0')}M`;
  } else {
    return `${minutes}M`;
  }
};

const displayTime = (time) => (time ? dayjs(time).format(DateFormat.TIME) : '');
const displayDate = (date) => (date ? dayjs(date).format(DateFormat.DATE) : '');
const displayDateTime = (date, dateFormat = DateFormat.DATE_TIME_SYSTEM) => (date ? dayjs(date).format(dateFormat) : '');
const displayDateMonth = (date) => (date ? dayjs(date).format(DateFormat.DATE_MONTH) : '');

export {
  calculateDuration,
  displayTime,
  displayDate,
  displayDateTime,
  displayDateMonth,
};
