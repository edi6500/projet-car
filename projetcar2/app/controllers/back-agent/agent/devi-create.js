import Controller from '@ember/controller';
import {inject as service} from '@ember/service'

export default Controller.extend({
  session: service(),
  ajax: service(),
  actions: {
    async sendQuote(event){
      event.preventDefault();
      // console.log(this.session.data.authenticated.response.accessToken);
      await this.ajax.patch(`http://localhost:8001/api/v1/quotes/pricing/${this.get('model.id')}`, {
        headers: {
          'Content-type': 'application/json',
          'Authorization': `Bearer ${this.session.data.authenticated.response.accessToken}`
        },
        data: {
          status: 'traité',
          totalKm: this.nbrKm,
          numberDriver: this.nbrDriver,
          numberAutocar: this.nbrCar,
        }
      });
      this.model.reload();
      this.transitionToRoute('back-agent.agent.devis-attente');
    }
  }
});
