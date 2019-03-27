import Base from 'ember-simple-auth/authenticators/base';
import { inject as service } from '@ember/service';
export default Base.extend({
  ajax: service(),
  async restore(data) {
    return data;
  },
  async authenticate(email, password) {
    let response = await this.ajax.post('http://localhost:8001/api/v1/auth/login', {
      data : {
        email : email,
        password : password
      }
    });
    return {response};
  }
});
