import dayjs from 'dayjs';

const duration = require('dayjs/plugin/duration');
dayjs.extend(duration);// задать вопрос наставнику - правильно ли подключил плагин???

function getRandomInt(min = 0, max = 1) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomArrayElement(items) {
  return items[Math.floor(Math.random() * items.length)];
}

function addZeroToNumber(number) {
  return (number < 10) ? `0${number}` : number;
}

function getDateCalc(start, finish) {
  const diffTimeInMs = finish.diff(start);
  const timeDuration = dayjs.duration(diffTimeInMs);
  const days = timeDuration.days();
  const hours = timeDuration.hours();
  const minutes = timeDuration.minutes();
  const time = `${(days > 0) ? `${addZeroToNumber(days) }D ` : ''}${(hours > 0) ? `${addZeroToNumber(hours) }H ` : ''}${(minutes > 0) ? `${addZeroToNumber(minutes) }M` : ''}`;
  return time;
}

export { getRandomInt, getRandomArrayElement, getDateCalc };
