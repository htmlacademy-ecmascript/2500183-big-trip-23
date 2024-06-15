import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import { DateFormat } from '../const.js';
import { timeType } from '../const';

dayjs.extend(duration);

function getRandomInt(min = 0, max = 1) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomArrayElement(items) {
  return items[Math.floor(Math.random() * items.length)];
}

function getDateCalc(dateTo, dateFrom) {
  const timeDurations = [
    { sign: 'D', value: dayjs(dateTo).diff(dateFrom, 'd') },
    { sign: 'H', value: dayjs(dateTo).diff(dateFrom, 'h') % timeType.HOURS },
    { sign: 'M', value: dayjs(dateTo).diff(dateFrom, 'm') % timeType.MINUTES },
  ];
  const resultDurations = [];
  for (let i = 0; i < timeDurations.length; i++) {
    if (timeDurations[i].value && timeDurations[i].value < 10) {
      resultDurations.push(`0${timeDurations[i].value}${timeDurations[i].sign} `);
    } else if (timeDurations[i].value && timeDurations[i].value >= 10) {
      resultDurations.push(`${timeDurations[i].value}${timeDurations[i].sign} `);
    } else if (!timeDurations[i].value && resultDurations.length !== 0) {
      resultDurations.push(`00${timeDurations[i].sign} `);
    }
  }
  return resultDurations.join('');
}

const TimeDiff = {
  DAY: 60 * 60 * 24 * 100,
};

const getDuration = (dateFrom, dateTo) => {
  const diff = Math.abs(dayjs(dateTo).diff(dateFrom));

  const daysValue = Math.floor(diff / TimeDiff.DAY);
  const durationValue = dayjs.duration(diff);

  const time = durationValue.format('DD[D] HH[H] mm[M]').split('');

  if (durationValue.get('day') !== daysValue) {
    time[0] = `${daysValue}D`;
  }
  return time.join('');
};

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
  getRandomInt,
  getRandomArrayElement,
  getDateCalc,
  getDuration,
  calculateDuration,
  displayTime,
  displayDate,
  displayDateTime,
  displayDateMonth,
};
