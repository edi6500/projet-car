import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | home/accueil', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:home/accueil');
    assert.ok(route);
  });
});
