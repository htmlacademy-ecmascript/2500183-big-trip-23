export const createOffersList = (offersList) => offersList.map((offer) => `<li class="event__offer"
  <span class="event__offer-title">${offer.title} &plus;&euro;&nbsp;</span>
   <span class="event__offer-price">${offer.price}</span>
  </li>`).join('');
