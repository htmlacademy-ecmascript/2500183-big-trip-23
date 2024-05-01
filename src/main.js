import BoardPresenter from './presenter/new-presenter.js';
import {generateWaypoint} from './mock/points.js';
const myBoardepresenters = new BoardPresenter();

myBoardepresenters.init();

console.log(generateWaypoint());


