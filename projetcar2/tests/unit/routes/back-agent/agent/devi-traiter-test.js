import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | back-agent/agent/devi-traiter', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:back-agent/agent/devi-traiter');
    assert.ok(route);
  });
});
