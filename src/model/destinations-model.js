import Observable from '../framework/observable.js';
import {UpdateType} from '../const.js';


export default class DestinationsModel extends Observable {
  #destinationsApiService = null;
  #destinations = [];
  #isLoading = true;
  #isError = false;

  constructor({destinationsApiService}) {
    super();
    this.#destinationsApiService = destinationsApiService;
  }

  async init() {
    try {
      const destinations = await this.#destinationsApiService.destinations;
      this.#destinations = destinations;
    } catch(err) {
      this.#destinations = [];
      this.#isError = true;
    }

    this.#isLoading = false;
    this._notify(UpdateType.INIT);
  }

  get destinations() {
    return this.#destinations;
  }

  get isLoading() {
    return this.#isLoading;
  }

  get isError() {
    return this.#isError;
  }

  getDestinationById(id) {
    return this.#destinations.find((destination) => destination.id === id);
  }
}
