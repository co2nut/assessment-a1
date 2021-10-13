const users = require('./users/users.service.js');
const ads = require('./ads/ads.service.js');
const tickets = require('./tickets/tickets.service.js');
const parameters = require('./parameters/parameters.service.js');
// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(users);
  app.configure(ads);
  app.configure(tickets);
  app.configure(parameters);
};
