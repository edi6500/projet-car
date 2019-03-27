import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | back-client/client', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:back-client/client');
    assert.ok(route);
  });
});
