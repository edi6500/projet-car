import DS from 'ember-data';

const { Model, attr, belongsTo, hasMany } = DS;

export default Model.extend({
  firstname: attr('string'),
  lastname: attr('string'),
  email: attr('string'),
  phoneNumber: attr('string'),
  address: attr(),
  companyAddress:attr(),
  companyName: attr('string'),
  companyPhone: attr('string'),
  tvaNumber: attr('string'),
  iban: attr('string'),
  userId: belongsTo('user'),
  quotesId: hasMany('quote')
});

