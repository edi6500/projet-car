import Controller from '@ember/controller';
import {inject as service} from '@ember/service';

export default Controller.extend({
  ajax: service(),
  lastname: '',
  firstname: '',
  email: '',
  phone: '',
  com: '',
  actions: {
    async sendMessage(e){
      e.preventDefault();
      await this.ajax.post(`http://localhost:8001/api/v1/auth/message`, {
        data: {
          lastname: this.lastname,
          firstname: this.firstname,
          email: this.email,
          phone: this.phone,
          com: this.com
        }
      });
      await this.transitionToRoute('home.accueil');
    }
  }
});
