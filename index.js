//modular for future expansion to other APIs
var api = "";

var _und = require("underscore"); //
var config_json = ""; 


var swarmlicator = {};

swarmlicator.setup = function(config,callback) {
   var req_attr = ["provider_info","name","user","application_servers","storage_backend","init_cookie","username","passcookie","schematic"];
   var config_attr = Object.keys(config);
   var absent_attr = _und.difference(req_attr, config_attr);//slightly hacky code that checks to ensure config has correct vars
   if (absent_attr.length !== 0){
     throw Error("missing following attributes from config:" + absent_attr); 
   } else {
      config_json = config;   
      switch(config_json.provider_info.provider_id){
        case "digital_ocean": api = require('./middleware/digital_ocean/digital_ocean.js');
        break;
      }
      api.setup(config_json.provider_info,callback);
   }
};


//these bind the primary functions to their API.  This is not 100% nessecary, but done for visibility and in case of future expansion.
//general error checking should be moved here eventually
swarmlicator.curator_init = function(config,callback) {

};

swarmlicator.curator_scale = function(curator_id, size, callback) {
    api.curator_scale(curator_id,size, callback);
};

swarmlicator.troves_init = function(config, callback) {
    api.swarm_init(config,callback);
};

swarmlicator.trove_remove = function(trove_id,callback) {
  
};
swarmlicator.trove_add = function(config,image_id,size,callback) {
  
};

swarmlicator.trove_scale = function(trove_ids, trove_size, trove_number, callback) {
    api.trove_size(trove_ids,trove_size,trove_number,callback);
};

swarmlicator.swarmite_reset = function(ids, callback) {
    api.swarmite_reset(ids,callback);
};

swarmlicator.destroy_swarm = function(ids, callback) {
    api.destroy_swarm(ids,callback);
};

module.exports = swarmlicator;