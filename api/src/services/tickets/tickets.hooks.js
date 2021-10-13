const { authenticate } = require('@feathersjs/authentication').hooks;
const searchRegexOr = require('../../hooks/searchRegexOr');

module.exports = {
  before: {
    all: [ authenticate('jwt') ],
    find: [ searchRegexOr() ],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};
