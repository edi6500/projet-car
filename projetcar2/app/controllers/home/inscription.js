import Controller from '@ember/controller';
import { inject as service } from '@ember/service';

export default Controller.extend({
  ajax: service(),
  actions: {
    async subscribe(event){
      event.preventDefault();
      let newClient = await this.ajax.post('http://localhost:8001/api/v1/clients', {
        data: {
          firstname: this.firstname,
          lastname: this.lastname,
          email: this.email,
          phoneNumber: this.phoneNumber,
          address: {
            street: this.street,
            number: this.number,
            zip: this.zip,
            city: this.city,
            country: this.country
          },
          companyAddress: {
            street: this.companyStreet,
            number: this.companyNumber,
            zip: this.companyZip,
            city: this.companyCity,
            country: this.companyCountry
          },
          companyPhone: this.companyPhone,
          tvaNumber: this.tva,
          companyName: this.companyName,
          iban: this.iban
        }
      });
      this.transitionToRoute("home.confirm");
    }
  }
});
