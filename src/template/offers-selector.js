export function markUpOfferSelectores(offers, selected = []) {
  selected = new Set(selected);
  const isChecked = (id) => (selected.has(id) ? 'checked' : '');
  return offers
    .map(
      (offer) => `<div class="event__available-offers">
  <div class="event__offer-selector">
    <input class="event__offer-checkbox  visually-hidden" id="${offer.id}" type="checkbox" name="event-offer-luggage" ${isChecked(offer.id)}>
    <label class="event__offer-label" for="${offer.id}">
      <span class="event__offer-title">${offer.title}</span>
      &plus;&euro;&nbsp;
      <span class="event__offer-price">${offer.price}</span>
    </label>
  </div>`,
    )
    .join('');
}
