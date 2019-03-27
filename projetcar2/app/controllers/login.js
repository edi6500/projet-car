import Controller from '@ember/controller'
import {inject as service} from '@ember/service'

export default Controller.extend({
  session: service(),
  contactConfirmEmail:'',
  contactConfirmPwd:'',
  actions: {
    async login(event){
      event.preventDefault()
      let {contactConfirmEmail, contactConfirmPwd} = this
      // console.log(contactConfirmEmail, contactConfirmPwd)
      await this.session.authenticate('authenticator:credentials', contactConfirmEmail, contactConfirmPwd);
      // console.log(this.session);
      if (this.session.data.authenticated.response.user === 'client')
      {
        await this.transitionToRoute("/back-" + this.session.data.authenticated.response.user + '/' + this.session.data.authenticated.response.id + "/overview");
      }
      else
      {
        await this.transitionToRoute("/back-" + this.session.data.authenticated.response.user + '/' + this.session.data.authenticated.response.id + "/devis-attente");
      }
    }
  }
});
