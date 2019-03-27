import Base from 'ember-simple-auth/authenticators/base';
import { inject as service } from '@ember/service';

export default Base.extend({
  ajax: service(),
  async restore(data) {
    return data;
  },
  async authenticate(params) {
    // console.log(params);
    let Jwt = await this.ajax.post('http://localhost:8001/api/v1/auth/token-gen-client', {
      data : {
        token : params.token,
      }
    });
    let response = {accessToken : Jwt.accessToken, id : Jwt.refreshToken.userId, isChanged : false};
    // console.log(response);
    return response;
  },
});
