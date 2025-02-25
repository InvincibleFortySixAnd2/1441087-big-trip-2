import {getCapitalizedString} from '../utils/common-utils.js';
import AbstractView from '../framework/view/abstract-view.js';


function createSortItemTemplate(sortItem, currentSortType) {
  const {name, isAvailable} = sortItem;
  const isChecked = name === currentSortType ? 'checked' : '';
  const isDisabled = isAvailable ? '' : 'disabled';

  return (
    `<div class="trip-sort__item  trip-sort__item--${name}">
      <input
        id="sort-${name}"
        data-sort-type="${name}"
        class="trip-sort__input  visually-hidden"
        type="radio"
        name="trip-sort"
        value="sort-${name}"
        ${isChecked}
        ${isDisabled}>
      <label class="trip-sort__btn" for="sort-${name}">
        ${getCapitalizedString(name)}
      </label>
    </div>`
  );
}

function createSortTemplate(sortSettings, currentSortType) {
  const sortItems = [...sortSettings].map((sortItem) =>
    createSortItemTemplate(sortItem, currentSortType)).join('');

  return (
    `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
      ${sortItems}
    </form>`
  );
}


export default class SortView extends AbstractView {
  #sortSettings = null;
  #currentSortType = null;
  #handleSortChange = null;

  constructor({sortSettings, currentSortType, handleSortChange}) {
    super();
    this.#sortSettings = sortSettings;
    this.#currentSortType = currentSortType;
    this.#handleSortChange = handleSortChange;

    this.element.addEventListener('change', this.#sortChangeHandler);
  }

  get template() {
    return createSortTemplate(this.#sortSettings, this.#currentSortType);
  }

  #sortChangeHandler = (evt) => {
    this.#handleSortChange(evt.target.dataset.sortType);
  };
}
