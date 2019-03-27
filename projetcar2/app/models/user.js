import DS from 'ember-data';

const { Model, attr, belongsTo } = DS;
const roles = ['client', 'agent', 'chauffeur'];

export default Model.extend({
  email: attr('string'),
  password: attr('string'),
  role: attr('string'),
  refId: belongsTo('client'),
  refId: belongsTo('agent')
});
