import {render, RenderPosition, remove} from '../framework/render.js';
import TripInfoView from '../view/trip-info-view.js';

export default class TripInfoPresenter {
  #tripMainContainer = null;

  #destinationsModel = null;
  #eventsModel = null;
  #offersModel = null;

  #tripInfoComponent = null;

  constructor({tripMainContainer, destinationsModel, eventsModel, offersModel}) {
    this.#tripMainContainer = tripMainContainer;
    this.#destinationsModel = destinationsModel;
    this.#eventsModel = eventsModel;
    this.#offersModel = offersModel;

    this.#destinationsModel.addObserver(this.#modelDestinationsHandler);
    this.#eventsModel.addObserver(this.#modelEventsHandler);
    this.#offersModel.addObserver(this.#modelOffersHandler);
  }

  init() {
    this.#renderTripInfo();
  }

  #modelDestinationsHandler = () => {
    this.#renderTripInfo();
  };

  #modelEventsHandler = () => {
    this.#clearTripInfo();
    this.#renderTripInfo();
  };

  #modelOffersHandler = () => {
    this.#renderTripInfo();
  };

  #renderTripInfo() {
    if(this.#eventsModel.isError ||
      this.#destinationsModel.isError ||
      this.#offersModel.isError) {
      return;
    }

    if (this.#eventsModel.isLoading ||
       this.#destinationsModel.isLoading ||
       this.#offersModel.isLoading) {
      return;
    }

    this.#tripInfoComponent = new TripInfoView({
      tripTotalCost: this.#getTripTotalCost(this.#eventsModel.events),
    });

    render(this.#tripInfoComponent, this.#tripMainContainer, RenderPosition.AFTERBEGIN);
  }

  #clearTripInfo() {
    remove(this.#tripInfoComponent);
  }

  #getEventTotalCost(event, offersPack) {
    const checkedOffers = offersPack.offers.filter((offer) => event.offers.includes(offer.id));
    const offersTotalCost = checkedOffers.map((offer) => offer.price).reduce((sum, price) => (sum += price), 0);
    const eventTotalCost = event.basePrice + offersTotalCost;

    return eventTotalCost;
  }

  #getTripTotalCost(events) {
    let tripTotalCost = 0;

    events.forEach((event) => {
      const offersPack = this.#offersModel.getOffersPackByType(event.type);
      tripTotalCost += this.#getEventTotalCost(event, offersPack);
    });

    return tripTotalCost;
  }
}
