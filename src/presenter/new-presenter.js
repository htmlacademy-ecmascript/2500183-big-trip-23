import {render} from '../render';
import NewTripEventsListView from '../view/trip-events-list-view';

export default class BoardPresenter {
  constructor() {
    this.siteTripEventsSection = document.querySelector('.trip-events');
  }

  init(){
    render(new NewTripEventsListView(),this.siteTripEventsSection);
  }
}
