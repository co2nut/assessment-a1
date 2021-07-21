// Initializes the `specs` service on path `/specs`
const { Specs } = require('./specs.class');
const createModel = require('../../models/specs.model');
const hooks = require('./specs.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/specs', new Specs(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('specs');

  service.hooks(hooks);
};
