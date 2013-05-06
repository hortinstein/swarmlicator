//modular for future expansion to other APIs
var api = "";

 //
var config_json = "";

var _und = require("underscore");
//this function takes a list of required attributes and ensures they are present
var check_req_attr = function(config, req_attr, callback) {
	var config_attr = Object.keys(config);
	var absent_attr = _und.difference(req_attr, config_attr); //slightly hacky code that checks to ensure config has correct vars
	if (absent_attr.length !== 0) {
		throw Error("missing following attributes from config:" + absent_attr);
	} else {
		callback();
	};
};

var swarmlicator = {};

swarmlicator.setup = function(config, callback) {
	var req_attr = ["provider_info", "name", "user", "application_servers",
		"storage_backend", "init_cookie", "username", "passcookie", "schematic"]
	check_req_attr(config,req_attr,function () {
		config_json = config;
		switch (config_json.provider_info.provider_id) {
			case "digital_ocean":
				api = require('./middleware/digital_ocean/digital_ocean.js');
				break;
		};
		api.setup(config_json.provider_info, callback);
	});
};

swarmlicator.swarmlicant_ping = function(address, callback) {
	var test_alive = function(address, callback) {
		var request = require("request");
		request.get({
			uri: address,
			timeout: 1000
		}, function(e, r, o) {
			//console.log(o);
			if (o !== "\"pong\"") {
				//console.log('server not alive yet');
				//throw event to show server is still not alive?
				setTimeout(test_alive, 1000, address, callback);
			} else {
				//console.log('found');
				//would be a good place to send a callback to configure the trove
				callback();
			}
		});
	}
	setTimeout(test_alive, 1000, address, callback);
};

swarmlicator.swarm_init = function(config, callback) {

	//needs to be called after all nodes are added
	//swarmlicator.curator_init(config);
}


// too dangerous right now
swarmlicator.swarm_destory = function(ids, callback) {
	//   api.destroy_swarm(ids,callback);
};


//these bind the primary functions to their API.  This is not 100% nessecary, but done for visibility and in case of future expansion.
//general error checking should be moved here eventually
swarmlicator.curator_init = function(config, callback) {
	var req_attr = ["type", "name", "user", "application_servers","init","port"
		"storage_backend", "init_cookie", "username", "passcookie", "troves"]
	check_req_attr(config,req_attr,function () {
	});

};

swarmlicator.curator_scale = function(curator_id, size, callback) {
	api.curator_scale(curator_id, size, callback);
};

swarmlicator.troves_init = function(number, size, name, callback) {
	var async = require('async');
	async.times(number, function(n, next){
    api.swarmlicant_init(size, name + n, function(err, droplet) {
      next(err, droplet);
    });
  }, function (e,swarm) {
  	console.log(swarm);
  }

}
swarmlicator.trove_add = function(size, name, callback) {

};

swarmlicator.trove_remove = function(trove_id, callback) {

};

swarmlicator.swarmlicant_scale = function(trove_ids, swarmlicant_size, callback) {
	api.swarmlicant_scale(trove_ids, trove_size, trove_number, callback);
};

swarmlicator.swarmlicant_reset = function(ids, callback) {
	api.swarmlicant_reset(ids, callback);
};

// too dangerous right now
// swarmlicator.destroy_swarm = function(ids, callback) {
//   api.destroy_swarm(ids,callback);
// };

module.exports = swarmlicator;