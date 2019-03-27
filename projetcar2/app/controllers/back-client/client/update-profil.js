import Controller from '@ember/controller';
import { inject as service } from '@ember/service';

export default Controller.extend({
  session: service(),
  ajax: service(),
  actions: {
    async updateProfile(){
      await this.ajax.patch(`http://localhost:8001/api/v1/auth/${this.session.data.authenticated.id}`, {
        data : {
          password : confirmPwd
        }
      });
    }
  }
});
