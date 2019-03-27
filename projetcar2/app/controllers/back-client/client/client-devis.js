import Controller from '@ember/controller';
import { inject as service } from '@ember/service';

export default Controller.extend({
  ajax: service(),
  options: [],
  tv: false,
  wifi: false,
  remorque: false,
  toilettes: false,
  actions: {
    toggleCheckBox(params) {
      let { options, tv, toilettes, wifi, remorque } = this;
      let index = '';
      if (params === "remorque" && remorque === true || params === "wifi" && wifi === true || params === "tv" && tv === true || params === "toilettes" && toilettes === true) {
        this.set(params, false);
        if (this.tv === false && options.includes("tv")) {
          index = options.indexOf("tv");
          options.splice(index, 1);
        }
        if (this.toilettes === false && options.includes("toilettes")) {
          index = options.indexOf("toilettes");
          options.splice(index, 1);
        }
        if (this.remorque === false && options.includes("remorque")) {
          index = options.indexOf("remorque");
          options.splice(index, 1);
        }
        if (this.wifi === false && options.includes("wifi")) {
          index = options.indexOf("wifi");
          options.splice(index, 1);
        }
        return;
      }
      this.set(params, true);
      if (!options.includes(params)) {
        options.push(params);
      }
    },
    async sendDevis(event) {
      event.preventDefault();
      // let client = await this.store.findRecord('client', this.get('model.id'));
      // console.log(this.get('model.id'));
      let newDevis = await this.ajax.post('http://localhost:8001/api/v1//quotes', {
        data: {
          idClient: this.get('model.id'),
          status: "attente",
          placeStart: {
            country: this.dptCountry,
            street: this.dptAdress,
            number: this.dptNumber,
            zip: this.dptZip,
            city: this.dptCity,

          },
          placeEnd: {
            country: this.arrCountry,
            street: this.arrAdress,
            number: this.arrNumber,
            zip: this.arrZip,
            city: this.arrCity,
          },
          dateArrival: this.arrDate,
          dateDeparture: this.dptDate,
          totalKm: 0,
          totalKmPrice: 0,
          nbrPassenger: this.passagerNumber,
          options: this.options, 
          optionsPrice: 0, 
          numberDriver: 0,
          numberDriverPrice: 0,
          numberAutocar: 0,
          numberAutocarPrice: 0,
          price: 0,
          com: this.com
        }
      });
      this.transitionToRoute("back-client.client.overview");
    }
  }
});

