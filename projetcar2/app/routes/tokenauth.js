import Route from '@ember/routing/route';
import { inject as service } from '@ember/service'

export default Route.extend({
  session: service(),
  ajax: service(),
  async model(params){
    try {
      this.session.data['isChanged'] = false;
      await this.session.authenticate('authenticator:credentials-without-password', params);
      await this.transitionTo('home.changepassword');
    } catch (error) {
      console.log(error.message);
    }
  }
});
