import DS from 'ember-data';
import { assign } from '@ember/polyfills';

export default DS.RESTSerializer.extend({
  primaryKey:'_id',
  serializeIntoHash: function(hash, type, record, options) {
    assign(hash, this.serialize(record, options));
  },
  normalizeResponse (store, primaryModelClass, payload, id, requestType) {
    let newPayload = {}
    newPayload[primaryModelClass.modelName]=payload;
    // console.log(newPayload)
    return this._super(store, primaryModelClass, newPayload, id, requestType)
  }
});
