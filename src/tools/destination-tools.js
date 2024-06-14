const generateDestList = (destination) => `${destination.map((elem) => `<option value="${elem.name}"></option>`).join('')}`;

const getCurrentDestination = (destinationId, destination) => destination.find((element) => element.id === destinationId);

export {generateDestList,getCurrentDestination};
