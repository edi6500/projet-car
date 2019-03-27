import DS from 'ember-data';
import DataAdapterMixin from 'ember-simple-auth/mixins/data-adapter-mixin';

export default DS.RESTAdapter.extend(DataAdapterMixin, {
  host: 'http://localhost:8001',
  namespace: 'api/v1',
  authorize(xhr){
    let token = this.get('session.data.authenticated.response.accessToken');
    if(token){
      xhr.setRequestHeader('Authorization', `Bearer ${token}`);
    }
  }
});