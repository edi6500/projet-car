import Controller from '@ember/controller';
import {inject as service} from '@ember/service'

export default Controller.extend({
  session: service(),
  ajax: service(),
  actions: {
    async acceptQuote(event){
      event.preventDefault();
      await this.ajax.patch(`http://localhost:8001/api/v1/quotes/${this.get('model.id')}`, {
        headers: {
          'Content-type': 'application/json',
          'Authorization': `Bearer ${this.session.data.authenticated.response.accessToken}`
        },
        data: {
          status: 'accepté'
        }
      });
      this.model.reload();
      this.transitionToRoute('back-client.client.overview');
    },
    async refuseQuote(event){
      event.preventDefault();
      await this.ajax.patch(`http://localhost:8001/api/v1/quotes/${this.get('model.id')}`, {
        headers: {
          'Content-type': 'application/json',
          'Authorization': `Bearer ${this.session.data.authenticated.response.accessToken}`
        },
        data: {
          status: 'refusé'
        }
      });
      this.model.reload();
      this.transitionToRoute('back-client.client.overview');
    },
  }
});
