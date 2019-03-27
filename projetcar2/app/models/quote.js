import DS from 'ember-data';

const { Model, attr, belongsTo } = DS;

export default Model.extend({
    idClient: belongsTo('client'),
    status: attr('string'),
    placeStart: attr(),
    placeEnd: attr(),
    dateArrival: attr('date'),
    dateDeparture: attr('date'),
    totalKm: attr('number'),
    totalKmPrice: attr('number'),
    nbrPassenger: attr('number'),
    options: attr(),
    optionsPrice: attr('number'),
    numberDriver:attr('number'),
    numberDriverPrice:attr('number'),
    capacityAutocar: attr('number'),
    numberAutocar: attr('number'),
    numberAutocarPrice: attr('number'),
    price: attr('number'),
    dateCreation: attr('date'),
    com: attr('string')
});
