import {render} from './render.js';
import NewTaskHeaderFilterView from './view/new-task-header-filter-view.js';

const siteHeaderFilterElement = document.querySelector('.trip-controls__filters');

render(new NewTaskHeaderFilterView(), siteHeaderFilterElement);
