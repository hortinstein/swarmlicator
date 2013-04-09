var brinydeep = require('brinydeep');
var region_id = 0;
var sizes = [];

//retrieves the latest sizes
var size_def = function(callback) {
  sizes = brinydeep.sizes(function(e,o){
    if (e){
      console.log(e);
      throw Error(e);
    } else {
      sizes = o.sizes;
      callback();
    }
  });
}

var api = {};

api.setup = function(provider_info,callback) {
  brinydeep.setup(provider_info.api_info.client_key,
                  provider_info.api_info.api_key);
  region_id = provider_info.region_id;
  size_def(callback);
};

api.swarmite_init = function(size, config, callback) {
    
};

api.curator_scale = function(curator_id, size, callback) {

};

api.trove_scale = function(trove_ids, trove_size, trove_number, callback) {

};

api.swarmite_reset = function(ids, callback) {

};

api.destroy_swarm = function(ids, callback) {

};

module.exports = api;