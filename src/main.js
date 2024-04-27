import {render} from './render.js';
import NewTripFiltersView from './view/trip-filters-view.js';

const siteHeaderFilterElement = document.querySelector('.trip-controls__filters');

render(new NewTripFiltersView(), siteHeaderFilterElement);
