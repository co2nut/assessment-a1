const assert = require('assert');
const app = require('../../src/app');

describe('\'specs\' service', () => {
  it('registered the service', () => {
    const service = app.service('specs');

    assert.ok(service, 'Registered the service');
  });
});
