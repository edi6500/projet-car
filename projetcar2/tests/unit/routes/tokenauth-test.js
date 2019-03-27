import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | tokenauth', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:tokenauth');
    assert.ok(route);
  });
});
