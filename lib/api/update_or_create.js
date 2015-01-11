'use strict';

var async = require('async');

/**
 * Update if the model instance exists with the same key or create a new instance
 *
 * @param {String} modelName The model name
 * @param {Object} data The model instance data
 * @param {Function} [apiCallback] The callback function
 */
module.exports = function(modelName, data, apiCallback){
  var self = this;

  async.waterfall([
    update,
    create
  ], apiCallback);

  function update(callback){
    self.updateAttributes(modelName, data.key, data, function(error, updatedDocument){
      if (error || !results) callback(null, false);

      callback(null, updatedDocument);
    });
  }

  function create(updatedDocument, callback){
    if (updatedDocument) return callback(null, updatedDocument);

    self.create(modelName, data, callback);
  }
};