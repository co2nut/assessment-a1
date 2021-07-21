const assert = require('assert');
const app = require('../../src/app');

describe('\'ads\' service', () => {
  it('registered the service', () => {
    const service = app.service('ads');

    assert.ok(service, 'Registered the service');
  });
});
