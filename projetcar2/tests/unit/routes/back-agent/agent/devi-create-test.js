import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | back-agent/agent/devi-create', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:back-agent/agent/devi-create');
    assert.ok(route);
  });
});
