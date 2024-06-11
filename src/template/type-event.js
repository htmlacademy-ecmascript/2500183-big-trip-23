export const createEventTypeTemplate = (type, pointType, id) => `
  <div class="event__type-item">
    <input id="event-type-${type.toLowerCase()}-${id}" class="event__type-input visually-hidden" type="radio" name="event-type-${id}" value="${type.toLowerCase()}" ${type.toLowerCase() === pointType ? 'checked' : ''}>
    <label class="event__type-label  event__type-label--${type.toLowerCase()}" for="event-type-${type.toLowerCase()}-${id}">${type}</label>
  </div>
`;
export const createEventTypeList = (eventTypes,type, id) => `<div class="event__type-list">
          <fieldset class="event__type-group">
            <legend class="visually-hidden">Event type</legend>
            ${eventTypes.map((group) => createEventTypeTemplate(group, type, id)).join('')}
          </fieldset>
        </div>`;
