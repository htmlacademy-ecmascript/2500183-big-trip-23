const markUpOfferSelectors = (offers = [], point) => {
  const isChecked = (offer) => point.offers.some((offerId) => offerId === offer.id);

  return offers
    .map(
      (offer) => `
      <div class="event__offer-selector">
        <input class="event__offer-checkbox  visually-hidden" id="${offer.id}" type="checkbox" name="event-offer-luggage" ${isChecked(offer) ? 'checked' : ''}>
        <label class="event__offer-label" for="${offer.id}">
          <span class="event__offer-title">${offer.title}</span>
          &plus;&euro;&nbsp;
          <span class="event__offer-price">${offer.price}</span>
        </label>
      </div>`,
    )
    .join('');
};

const markUpOffers = (statePoint, getOffers) => {
  const typeOffers = getOffers(statePoint.type);

  if (typeOffers.length === 0) {
    return '';
  }

  return `<section class="event__section  event__section--offers">
    ${typeOffers.length ? '<h3 class="event__section-title  event__section-title--offers">Offers</h3>' : ''}

    <div class="event__available-offers">
        ${markUpOfferSelectors(typeOffers, statePoint)}
    </div>
  </section>`;
};

export { markUpOffers };
