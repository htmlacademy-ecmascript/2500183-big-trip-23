(()=>{"use strict";function e(e){var t=document.createElement("div");return t.innerHTML=e,t.firstElementChild}function t(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"beforeend";t.insertAdjacentElement(n,e.getElement())}function n(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}var i=function(){function t(){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t)}var i,a;return i=t,(a=[{key:"getTemplate",value:function(){return'<form class="trip-events__trip-sort  trip-sort" action="#" method="get">\n  <div class="trip-sort__item  trip-sort__item--day">\n    <input id="sort-day" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-day" checked>\n    <label class="trip-sort__btn" for="sort-day">Day</label>\n  </div>\n\n  <div class="trip-sort__item  trip-sort__item--event">\n    <input id="sort-event" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-event" disabled>\n    <label class="trip-sort__btn" for="sort-event">Event</label>\n  </div>\n\n  <div class="trip-sort__item  trip-sort__item--time">\n    <input id="sort-time" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-time">\n    <label class="trip-sort__btn" for="sort-time">Time</label>\n  </div>\n\n  <div class="trip-sort__item  trip-sort__item--price">\n    <input id="sort-price" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-price">\n    <label class="trip-sort__btn" for="sort-price">Price</label>\n  </div>\n\n  <div class="trip-sort__item  trip-sort__item--offer">\n    <input id="sort-offer" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-offer" disabled>\n    <label class="trip-sort__btn" for="sort-offer">Offers</label>\n  </div>\n</form>'}},{key:"getElement",value:function(){return this.element||(this.element=e(this.getTemplate())),this.element}},{key:"removeElement",value:function(){this.element=null}}])&&n(i.prototype,a),t}();function a(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}var l=function(){function t(){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t)}var n,i;return n=t,(i=[{key:"getTemplate",value:function(){return'<ul class="trip-events__list"></ul>'}},{key:"getElement",value:function(){return this.element||(this.element=e(this.getTemplate())),this.element}},{key:"removeElement",value:function(){this.element=null}}])&&a(n.prototype,i),t}();function s(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}var r=function(){function t(e,n){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t),this.point=e,this.destination=n}var n,i;return n=t,i=[{key:"getTemplate",value:function(){return function(e,t){var n=e.type,i=e.isFavorite,a=t.find((function(t){return t.id===e.destination}));return'<li class="trip-events__item">\n  <div class="event">\n    <time class="event__date" datetime="2019-03-18">MAR 18</time>\n    <div class="event__type">\n      <img class="event__type-icon" width="42" height="42" src="img/icons/'.concat(n,'.png" alt="Event type icon">\n    </div>\n    <h3 class="event__title">').concat(n," ").concat(a.name,'</h3>\n    <div class="event__schedule">\n      <p class="event__time">\n        <time class="event__start-time" datetime="2019-03-18T12:25">16:20</time>\n        &mdash;\n        <time class="event__end-time" datetime="2019-03-18T13:35">17:00</time>\n      </p>\n      <p class="event__duration">40M</p>\n    </div>\n    <p class="event__price">\n      &euro;&nbsp;<span class="event__price-value">600</span>\n    </p>\n    <h4 class="visually-hidden">Offers:</h4>\n    <ul class="event__selected-offers">\n      <li class="event__offer">\n        <span class="event__offer-title">Add breakfast</span>\n        &plus;&euro;&nbsp;\n        <span class="event__offer-price">50</span>\n      </li>\n    </ul>\n    <button class="event__favorite-btn ').concat(i?"event__favorite-btn--active":"",' " type="button">\n      <span class="visually-hidden">Add to favorite</span>\n      <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">\n        <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>\n      </svg>\n    </button>\n    <button class="event__rollup-btn" type="button">\n      <span class="visually-hidden">Open event</span>\n    </button>\n  </div>\n</li>')}(this.point,this.destination)}},{key:"getElement",value:function(){return this.element||(this.element=e(this.getTemplate())),this.element}},{key:"removeElement",value:function(){this.element=null}}],i&&s(n.prototype,i),t}();function o(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}var v=function(){function t(){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t)}var n,i;return n=t,(i=[{key:"getTemplate",value:function(){return'<li class="trip-events__item">\n  <form class="event event--edit" action="#" method="post">\n    <header class="event__header">\n      <div class="event__type-wrapper">\n        <label class="event__type  event__type-btn" for="event-type-toggle-1">\n          <span class="visually-hidden">Choose event type</span>\n          <img class="event__type-icon" width="17" height="17" src="img/icons/bus.png" alt="Event type icon">\n        </label>\n        <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">\n\n        <div class="event__type-list">\n          <fieldset class="event__type-group">\n            <legend class="visually-hidden">Event type</legend>\n\n            <div class="event__type-item">\n              <input id="event-type-taxi-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="taxi">\n              <label class="event__type-label  event__type-label--taxi" for="event-type-taxi-1">Taxi</label>\n            </div>\n\n            <div class="event__type-item">\n              <input id="event-type-bus-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="bus" checked>\n              <label class="event__type-label  event__type-label--bus" for="event-type-bus-1">Bus</label>\n            </div>\n\n            <div class="event__type-item">\n              <input id="event-type-train-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="train">\n              <label class="event__type-label  event__type-label--train" for="event-type-train-1">Train</label>\n            </div>\n\n            <div class="event__type-item">\n              <input id="event-type-ship-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="ship">\n              <label class="event__type-label  event__type-label--ship" for="event-type-ship-1">Ship</label>\n            </div>\n\n            <div class="event__type-item">\n              <input id="event-type-drive-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="drive">\n              <label class="event__type-label  event__type-label--drive" for="event-type-drive-1">Drive</label>\n            </div>\n\n            <div class="event__type-item">\n              <input id="event-type-flight-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="flight">\n              <label class="event__type-label  event__type-label--flight" for="event-type-flight-1">Flight</label>\n            </div>\n\n            <div class="event__type-item">\n              <input id="event-type-check-in-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="check-in">\n              <label class="event__type-label  event__type-label--check-in" for="event-type-check-in-1">Check-in</label>\n            </div>\n\n            <div class="event__type-item">\n              <input id="event-type-sightseeing-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="sightseeing">\n              <label class="event__type-label  event__type-label--sightseeing" for="event-type-sightseeing-1">Sightseeing</label>\n            </div>\n\n            <div class="event__type-item">\n              <input id="event-type-restaurant-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="restaurant">\n              <label class="event__type-label  event__type-label--restaurant" for="event-type-restaurant-1">Restaurant</label>\n            </div>\n          </fieldset>\n        </div>\n      </div>\n\n      <div class="event__field-group  event__field-group--destination">\n        <label class="event__label  event__type-output" for="event-destination-1">\n          Bus\n        </label>\n        <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="Geneva" list="destination-list-1">\n        <datalist id="destination-list-1">\n          <option value="Amsterdam"></option>\n          <option value="Geneva"></option>\n          <option value="Chamonix"></option>\n        </datalist>\n      </div>\n\n      <div class="event__field-group  event__field-group--time">\n        <label class="visually-hidden" for="event-start-time-1">From</label>\n        <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="19/03/19 00:00">\n        &mdash;\n        <label class="visually-hidden" for="event-end-time-1">To</label>\n        <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="19/03/19 00:00">\n      </div>\n\n      <div class="event__field-group  event__field-group--price">\n        <label class="event__label" for="event-price-1">\n          <span class="visually-hidden">Price</span>\n          &euro;\n        </label>\n        <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="">\n      </div>\n\n      <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>\n      <button class="event__reset-btn" type="reset">Cancel</button>\n    </header>\n\n    <section class="event__details">\n      <section class="event__section  event__section--destination">\n        <h3 class="event__section-title  event__section-title--destination">Destination</h3>\n        <p class="event__destination-description">Geneva is a city in Switzerland that lies at the southern tip of expansive Lac Léman (Lake Geneva). Surrounded by the Alps and Jura mountains, the city has views of dramatic Mont Blanc.</p>\n\n        <div class="event__photos-container">\n          <div class="event__photos-tape">\n            <img class="event__photo" src="img/photos/1.jpg" alt="Event photo">\n            <img class="event__photo" src="img/photos/2.jpg" alt="Event photo">\n            <img class="event__photo" src="img/photos/3.jpg" alt="Event photo">\n            <img class="event__photo" src="img/photos/4.jpg" alt="Event photo">\n            <img class="event__photo" src="img/photos/5.jpg" alt="Event photo">\n          </div>\n        </div>\n      </section>\n    </section>\n  </form>\n</li>'}},{key:"getElement",value:function(){return this.element||(this.element=e(this.getTemplate())),this.element}},{key:"removeElement",value:function(){this.element=null}}])&&o(n.prototype,i),t}();function p(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}var c=function(){function t(){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t)}var n,i;return n=t,(i=[{key:"getTemplate",value:function(){return'<li class="trip-events__item">\n  <form class="event event--edit" action="#" method="post">\n    <header class="event__header">\n      <div class="event__type-wrapper">\n        <label class="event__type  event__type-btn" for="event-type-toggle-1">\n          <span class="visually-hidden">Choose event type</span>\n          <img class="event__type-icon" width="17" height="17" src="img/icons/flight.png" alt="Event type icon">\n        </label>\n        <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">\n\n        <div class="event__type-list">\n          <fieldset class="event__type-group">\n            <legend class="visually-hidden">Event type</legend>\n\n            <div class="event__type-item">\n              <input id="event-type-taxi-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="taxi">\n              <label class="event__type-label  event__type-label--taxi" for="event-type-taxi-1">Taxi</label>\n            </div>\n\n            <div class="event__type-item">\n              <input id="event-type-bus-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="bus">\n              <label class="event__type-label  event__type-label--bus" for="event-type-bus-1">Bus</label>\n            </div>\n\n            <div class="event__type-item">\n              <input id="event-type-train-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="train">\n              <label class="event__type-label  event__type-label--train" for="event-type-train-1">Train</label>\n            </div>\n\n            <div class="event__type-item">\n              <input id="event-type-ship-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="ship">\n              <label class="event__type-label  event__type-label--ship" for="event-type-ship-1">Ship</label>\n            </div>\n\n            <div class="event__type-item">\n              <input id="event-type-drive-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="drive">\n              <label class="event__type-label  event__type-label--drive" for="event-type-drive-1">Drive</label>\n            </div>\n\n            <div class="event__type-item">\n              <input id="event-type-flight-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="flight" checked>\n              <label class="event__type-label  event__type-label--flight" for="event-type-flight-1">Flight</label>\n            </div>\n\n            <div class="event__type-item">\n              <input id="event-type-check-in-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="check-in">\n              <label class="event__type-label  event__type-label--check-in" for="event-type-check-in-1">Check-in</label>\n            </div>\n\n            <div class="event__type-item">\n              <input id="event-type-sightseeing-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="sightseeing">\n              <label class="event__type-label  event__type-label--sightseeing" for="event-type-sightseeing-1">Sightseeing</label>\n            </div>\n\n            <div class="event__type-item">\n              <input id="event-type-restaurant-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="restaurant">\n              <label class="event__type-label  event__type-label--restaurant" for="event-type-restaurant-1">Restaurant</label>\n            </div>\n          </fieldset>\n        </div>\n      </div>\n\n      <div class="event__field-group  event__field-group--destination">\n        <label class="event__label  event__type-output" for="event-destination-1">\n          Flight\n        </label>\n        <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="Chamonix" list="destination-list-1">\n        <datalist id="destination-list-1">\n          <option value="Amsterdam"></option>\n          <option value="Geneva"></option>\n          <option value="Chamonix"></option>\n        </datalist>\n      </div>\n\n      <div class="event__field-group  event__field-group--time">\n        <label class="visually-hidden" for="event-start-time-1">From</label>\n        <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="18/03/19 12:25">\n        &mdash;\n        <label class="visually-hidden" for="event-end-time-1">To</label>\n        <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="18/03/19 13:35">\n      </div>\n\n      <div class="event__field-group  event__field-group--price">\n        <label class="event__label" for="event-price-1">\n          <span class="visually-hidden">Price</span>\n          &euro;\n        </label>\n        <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="160">\n      </div>\n\n      <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>\n      <button class="event__reset-btn" type="reset">Delete</button>\n      <button class="event__rollup-btn" type="button">\n        <span class="visually-hidden">Open event</span>\n      </button>\n    </header>\n    <section class="event__details">\n      <section class="event__section  event__section--offers">\n        <h3 class="event__section-title  event__section-title--offers">Offers</h3>\n\n        <div class="event__available-offers">\n          <div class="event__offer-selector">\n            <input class="event__offer-checkbox  visually-hidden" id="event-offer-luggage-1" type="checkbox" name="event-offer-luggage" checked>\n            <label class="event__offer-label" for="event-offer-luggage-1">\n              <span class="event__offer-title">Add luggage</span>\n              &plus;&euro;&nbsp;\n              <span class="event__offer-price">50</span>\n            </label>\n          </div>\n\n          <div class="event__offer-selector">\n            <input class="event__offer-checkbox  visually-hidden" id="event-offer-comfort-1" type="checkbox" name="event-offer-comfort" checked>\n            <label class="event__offer-label" for="event-offer-comfort-1">\n              <span class="event__offer-title">Switch to comfort</span>\n              &plus;&euro;&nbsp;\n              <span class="event__offer-price">80</span>\n            </label>\n          </div>\n\n          <div class="event__offer-selector">\n            <input class="event__offer-checkbox  visually-hidden" id="event-offer-meal-1" type="checkbox" name="event-offer-meal">\n            <label class="event__offer-label" for="event-offer-meal-1">\n              <span class="event__offer-title">Add meal</span>\n              &plus;&euro;&nbsp;\n              <span class="event__offer-price">15</span>\n            </label>\n          </div>\n\n          <div class="event__offer-selector">\n            <input class="event__offer-checkbox  visually-hidden" id="event-offer-seats-1" type="checkbox" name="event-offer-seats">\n            <label class="event__offer-label" for="event-offer-seats-1">\n              <span class="event__offer-title">Choose seats</span>\n              &plus;&euro;&nbsp;\n              <span class="event__offer-price">5</span>\n            </label>\n          </div>\n\n          <div class="event__offer-selector">\n            <input class="event__offer-checkbox  visually-hidden" id="event-offer-train-1" type="checkbox" name="event-offer-train">\n            <label class="event__offer-label" for="event-offer-train-1">\n              <span class="event__offer-title">Travel by train</span>\n              &plus;&euro;&nbsp;\n              <span class="event__offer-price">40</span>\n            </label>\n          </div>\n        </div>\n      </section>\n\n      <section class="event__section  event__section--destination">\n        <h3 class="event__section-title  event__section-title--destination">Destination</h3>\n        <p class="event__destination-description">Chamonix-Mont-Blanc (usually shortened to Chamonix) is a resort area near the junction of France, Switzerland and Italy. At the base of Mont Blanc, the highest summit in the Alps, it\'s renowned for its skiing.</p>\n      </section>\n    </section>\n  </form>\n</li>'}},{key:"getElement",value:function(){return this.element||(this.element=e(this.getTemplate())),this.element}},{key:"removeElement",value:function(){this.element=null}}])&&p(n.prototype,i),t}();function u(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}var _=function(){function e(t){var n,i,a,s=t.boardContainer,r=t.pointModel;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),n=this,i="containerListComponent",a=new l,i in n?Object.defineProperty(n,i,{value:a,enumerable:!0,configurable:!0,writable:!0}):n[i]=a,this.boardContainer=s,this.pointModel=r}var n,a;return n=e,a=[{key:"init",value:function(){var e=this,n=this.pointModel.getPoints(),a=this.pointModel.getDestinations();t(new i,this.boardContainer),t(this.containerListComponent,this.boardContainer),t(new v,this.containerListComponent.getElement()),t(new c,this.containerListComponent.getElement()),n.forEach((function(n){t(new r(n,a),e.containerListComponent.getElement())}))}}],a&&u(n.prototype,a),e}();function d(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}var f=function(){function t(){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t)}var n,i;return n=t,(i=[{key:"getTemplate",value:function(){return'<section class="trip-main__trip-info  trip-info">\n  <div class="trip-info__main">\n    <h1 class="trip-info__title">Amsterdam &mdash; Chamonix &mdash; Geneva</h1>\n\n    <p class="trip-info__dates">18&nbsp;&mdash;&nbsp;20 Mar</p>\n  </div>\n\n  <p class="trip-info__cost">\n    Total: &euro;&nbsp;<span class="trip-info__cost-value">1230</span>\n  </p>\n</section>'}},{key:"getElement",value:function(){return this.element||(this.element=e(this.getTemplate())),this.element}},{key:"removeElement",value:function(){this.element=null}}])&&d(n.prototype,i),t}();function y(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}var b=function(){function t(){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t)}var n,i;return n=t,(i=[{key:"getTemplate",value:function(){return'<form class="trip-filters" action="#" method="get">\n  <div class="trip-filters__filter">\n    <input id="filter-everything" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="everything" checked>\n    <label class="trip-filters__filter-label" for="filter-everything">Everything</label>\n  </div>\n\n  <div class="trip-filters__filter">\n    <input id="filter-future" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="future">\n    <label class="trip-filters__filter-label" for="filter-future">Future</label>\n  </div>\n\n  <div class="trip-filters__filter">\n    <input id="filter-present" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="present">\n    <label class="trip-filters__filter-label" for="filter-present">Present</label>\n  </div>\n\n  <div class="trip-filters__filter">\n    <input id="filter-past" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="past">\n    <label class="trip-filters__filter-label" for="filter-past">Past</label>\n  </div>\n\n  <button class="visually-hidden" type="submit">Accept filter</button>\n</form>'}},{key:"getElement",value:function(){return this.element||(this.element=e(this.getTemplate())),this.element}},{key:"removeElement",value:function(){this.element=null}}])&&y(n.prototype,i),t}();function h(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}var m=function(){function e(t){var n=t.boardContainer,i=t.headerContainer;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.boardContainer=n,this.headerContainer=i}var n,i;return n=e,(i=[{key:"init",value:function(){t(new b,this.headerContainer),t(new f,this.boardContainer,"afterbegin")}}])&&h(n.prototype,i),e}(),g=[{id:"f4b62099-293f-4c3d-a702-94eec4a2808cy",basePrice:1500,dateFrom:"2019-07-10T22:55:56.845Z",dateTo:"2019-07-11T11:22:13.375Z",destination:"bfa5cb75-a1fe-4b77-a83c-0e528e910e04",isFavorite:!0,offers:["b4c3e4e6-9053-42ce-b747-e281314baa31"],type:"drive"},{id:"f4b62099-293f-4c3d-a702-94eec4a2808ct",basePrice:1300,dateFrom:"2019-07-10T22:55:56.845Z",dateTo:"2019-07-11T11:22:13.375Z",destination:"bfa5cb75-a1fe-4b77-a83c-0e528e910e05",isFavorite:!1,offers:[],type:"taxi"},{id:"f4b62099-293f-4c3d-a702-94eec4a2808cyyt",basePrice:1100,dateFrom:"2019-07-10T22:55:56.845Z",dateTo:"2019-07-11T11:22:13.375Z",destination:"bfa5cb75-a1fe-4b77-a83c-0e528e910e06",isFavorite:!0,offers:["b4c3e4e6-9053-42ce-b747-e281314baa31","b4c3e4e6-9053-42ce-b747-e281314baa31"],type:"flight"}],k=[{id:"bfa5cb75-a1fe-4b77-a83c-0e528e910e04",description:"Chamonix, is a beautiful city, a true asian pearl, with crowded streets.",name:"Chamonix",pictures:[{src:"http://picsum.photos/300/200?r=0.0762563005163317",description:"Chamonix parliament building"}]},{id:"bfa5cb75-a1fe-4b77-a83c-0e528e910e05",description:"Chamonix, is a beautiful city, a true asian pearl, with crowded streets.",name:"Moscow",pictures:[{src:"http://picsum.photos/300/200?r=0.0762563005163317",description:"Chamonix parliament building"}]},{id:"bfa5cb75-a1fe-4b77-a83c-0e528e910e06",description:"Chamonix, is a beautiful city, a true asian pearl, with crowded streets.",name:"New York",pictures:[{src:"http://picsum.photos/300/200?r=0.0762563005163317",description:"Chamonix parliament building"}]}];function w(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}var C=new(function(){function e(){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.points=[],this.destination=[]}var t,n;return t=e,(n=[{key:"init",value:function(){this.points=g,this.destination=k}},{key:"getPoints",value:function(){return this.points}},{key:"getDestinations",value:function(){return this.destination}}])&&w(t.prototype,n),e}());C.init();var x=document.querySelector(".trip-controls__filters"),T=document.querySelector(".trip-main"),E=document.querySelector(".trip-events"),P=new m({boardContainer:T,headerContainer:x}),j=new _({boardContainer:E,pointModel:C});P.init(),j.init()})();
//# sourceMappingURL=bundle.5452478a5bb3d6541de0.js.map