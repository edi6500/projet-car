import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | back-client/client/client-devis', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:back-client/client/client-devis');
    assert.ok(route);
  });
});