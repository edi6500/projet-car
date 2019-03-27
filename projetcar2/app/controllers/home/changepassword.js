import Controller from '@ember/controller';
import {inject as service} from '@ember/service';

export default Controller.extend({
  session: service(),
  ajax: service(),
  pwd:'',
  confirmPwd:'',
  pwdDiff: false,
  actions: {
    async changePwd(event){
      event.preventDefault()
      let {pwd, confirmPwd} = this;
      // console.log(pwd+" et "+confirmPwd);
      if(pwd === confirmPwd)
      {
        this.set('pwdDiff', false);
        await this.ajax.patch(`http://localhost:8001/api/v1/auth/${this.session.data.authenticated.id}`, {
          data : {
            password : confirmPwd
          }
        });
        this.session.invalidate();
        await this.transitionToRoute('login')
      }
      else
      {
        this.set('pwdDiff', true);
      }
    }
  }
});
