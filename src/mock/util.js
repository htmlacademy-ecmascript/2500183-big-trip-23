function getRandomInt (min = 0, max = 1) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomArrayElement(items) {
  return items[Math.floor(Math.random() * items.length)];
}

function getIdNumber (a, b) {
  const previousValues = [];
  return function () {
    let currentValue = getRandomInt(a, b);
    if (previousValues.length >= (b - a + 1)) {
      return null;
    }
    while (previousValues.includes(currentValue)) {
      currentValue = getRandomInt(a, b);
    }
    previousValues.push(currentValue);
    return currentValue;
  };
}

export { getRandomInt,getRandomArrayElement,getIdNumber};
