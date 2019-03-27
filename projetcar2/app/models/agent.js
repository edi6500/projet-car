import DS from 'ember-data';

const { Model, attr, belongsTo } = DS;

export default Model.extend({
  firstname: attr('string'),
  lastname: attr('string'),
  email: attr('string'),
  userId: belongsTo('user')
});
