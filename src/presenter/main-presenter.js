import {render} from '../render';
import NewTripEventsSortView from '../view/trip-events-sort-view';//
import NewTripEventsListView from '../view/trip-events-list-view';//
import NewTripEventsPointView from '../view/trip-events-points-view';//
import NewTripEventsAddPointView from '../view/trip-events-add-point-view';//
import NewTripEventsEditPointView from '../view/trip-events-edit-point-view';
import {testPoints} from '../mock/points-live';


export default class MainPresenter {
  containerListComponent = new NewTripEventsListView();

  constructor({boardContainer}) {
    this.boardContainer = boardContainer;
    //this.pointModel = pointModel;
  }

  init() {
    //console.log(this.pointModel);
    //const points = this.pointModel.getPoints();

    render(new NewTripEventsSortView(), this.boardContainer);
    render(this.containerListComponent, this.boardContainer);
    render(new NewTripEventsAddPointView(), this.containerListComponent.getElement());
    render(new NewTripEventsEditPointView(),this.containerListComponent.getElement());

    testPoints.forEach((point) => {
      render(new NewTripEventsPointView(point), this.containerListComponent.getElement());
    });
  }

}
