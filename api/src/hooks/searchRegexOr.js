var _ = require('lodash');

module.exports = function () {
    return function (hook) {
      const query = hook.params.query;
        if (!query) { return hook }
        if (!query.orRegexOr) { return hook }
        if (query.orRegexOr.length < 0) { delete hook.params.query.orRegexOr; return hook }
        if (_.isEmpty(query.orRegexOr) === true) { delete hook.params.query.orRegexOr; return hook }
        query["$and"] = []

        _.forEach(query.orRegexOr, (v, k) => {
            key = Object.keys(JSON.parse(v));
            values = Object.values(JSON.parse(v));
            let objectRegex = {}
            objectRegex[key[0]] = { $regex: new RegExp(values[0], 'i') }
            query["$and"].push(objectRegex)
        })

        delete hook.params.query.orRegexOr
        hook.params.query = query

        return hook
    }
}