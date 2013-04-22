var brinydeep = require('brinydeep');
var region_id = 0;
var image_id= 0;
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
  image_id = provider_info.image_id;
  size_def(callback);
};

api.swarmite_init = function(size, name, config, callback) {
  var swarmite_info = {};
  swarmite_info.name = name;
  swarmite_info.size = sizes[size];
  swarmite_info.image_id = image_id;
  swarmite_info.region_id = region_id;
   
  brinydeep.new_droplets(swarmite_info,callback);
};

api.swarmite_scale = function(id, size, callback) {
  brinydeep.resize(id,sizes[size],function (e,o) {
    callback();
  });
};

api.swarmite_destroy = function(id, callback) {
  brinydeep.destroy(id,function (e,o) {
    callback();
  });
};

api.swarmite_reset = function(id, callback) {
  brinydeep.reboot(id,function (e,o) {
    callback();
  });
};

//api.destroy_swarm = function(ids, callback) {

//};

module.exports = api;