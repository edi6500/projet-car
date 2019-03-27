import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | back-agent', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:back-agent');
    assert.ok(route);
  });
});
