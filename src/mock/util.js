import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';

dayjs.extend(duration);

function getRandomInt(min = 0, max = 1) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomArrayElement(items) {
  return items[Math.floor(Math.random() * items.length)];
}

function addZeroToNumber(number) {
  return number < 10 ? `0${number}` : number;
}

function getDateCalc(start, finish) {
  const diffTimeInMs = finish.diff(start);
  const timeDuration = dayjs.duration(diffTimeInMs);

  const days = timeDuration.years() * 365 + timeDuration.days(); // тут к дням ещё и года нужно прибавлять
  const hours = timeDuration.hours();
  const minutes = timeDuration.minutes();

  return `${days >= 0 ? `${addZeroToNumber(days)}D` : ''} ${hours >= 0 ? `${addZeroToNumber(hours)}H` : ''} ${minutes >= 0 ? `${addZeroToNumber(minutes)}M` : ''}`;
}

export { getRandomInt, getRandomArrayElement, getDateCalc };
