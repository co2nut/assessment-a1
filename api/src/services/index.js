const users = require('./users/users.service.js');
const specs = require('./specs/specs.service.js');
const ads = require('./ads/ads.service.js');
// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(users);
  app.configure(specs);
  app.configure(ads);
};
