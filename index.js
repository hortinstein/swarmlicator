//modular for future expansion to other APIs
var api = "";

var _und = require("underscore"); //
var config_json = "";


var swarmlicator = {};

swarmlicator.setup = function(config,callback) {
   var req_attr = ["provider_info","name","user","application_servers","type","storage_backend","init_cookie","username","passcookie","schematic"];
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

swarmlicator.swarmlicant_ping = function(address,callback) {
  var test_alive = function (address,callback) {
    var request = require("request");
    request.get({uri:address,timeout:100}, function(e, r, o) {
      //console.log(o);
    	if(o !== "\"pong\""){
          console.log('server not alive yet');
    	    setTimeout(test_alive,1000,address,callback);
      } else {
          //console.log('found');
          //would be a good place to send a callback to configure the trove
          callback();
      }
	});
  }
  setTimeout(test_alive,1000,address,callback);
};

//these bind the primary functions to their API.  This is not 100% nessecary, but done for visibility and in case of future expansion.
//general error checking should be moved here eventually
swarmlicator.curator_init = function(config,callback) {

};

swarmlicator.curator_scale = function(curator_id, size, callback) {
  api.curator_scale(curator_id,size, callback);
};

swarmlicator.troves_init = function(config, callback) {

};

swarmlicator.trove_remove = function(trove_id,callback) {

};
swarmlicator.trove_add = function(size,name,callback) {

};

swarmlicator.trove_scale = function(trove_ids, trove_size, trove_number, callback) {
  api.trove_size(trove_ids,trove_size,trove_number,callback);
};

swarmlicator.swarmlicant_reset = function(ids, callback) {
  api.swarmlicant_reset(ids,callback);
};

// too dangerous right now
// swarmlicator.destroy_swarm = function(ids, callback) {
//   api.destroy_swarm(ids,callback);
// };

module.exports = swarmlicator;