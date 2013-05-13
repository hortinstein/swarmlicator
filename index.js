//modular for future expansion to other APIs
var api = "";

//
var config_json = "";

var _und = require("underscore");
//this function takes a list of required attributes and ensures they are present
var check_req_attr = function(config, req_attr) {
	var config_attr = Object.keys(config);
	var absent_attr = _und.difference(req_attr, config_attr); //slightly hacky code that checks to ensure config has correct vars
	if (absent_attr.length !== 0) {
		throw Error("missing following attributes from config:" + absent_attr);
	} else {
	
	};
};

var swarmlicator = {};

swarmlicator.setup = function(config, callback) {
	var req_attr = ["provider_info", "name", "user", "application_servers",
		"storage_backend", "init_cookie", "username", "passcookie", "schematic"]
	check_req_attr(config, req_attr);
	config_json = config;
	switch (config_json.provider_info.provider_id) {
		case "digital_ocean":
			api = require('./middleware/digital_ocean/digital_ocean.js');
			break;
	};
	api.setup(config_json.provider_info, callback);
};

swarmlicator.swarmlicant_ping = function(address, callback) {
	var test_alive = function(address, callback) {
		var request = require("request");
		request.get({
			uri: address,
			timeout: 1000
		}, function(e, r, o) {
			if (o !== "\"pong\"") {
				setTimeout(test_alive, 1000, address, callback);
			} else {
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
	var req_attr = ["type", "name", "user", "application_servers", "init", "port",
		"storage_backend", "init_cookie", "username", "passcookie", "troves"]
	check_req_attr(config, req_attr); //sync fucntion that will throw an error if missing attr


};

swarmlicator.troves_add = function(number, size, name, callback) {
	var async = require('async');
	async.times(number, function(n, next) {
        console.log(n,next);
		api.swarmlicant_init(size, name + n, function(err, droplet) {
			next(err, droplet);
		});
	}, function(e, swarm) {
		console.log(swarm);
		//should return the array of troves ips/ids
	});
};

swarmlicator.troves_remove = function(trove_ids, callback) {
    //need to inform the curator when a trove is being destroyed, than await for acknoledgement before proceeding.  
};

swarmlicator.swarmlicant_scale = function(trove_ids, swarmlicant_size, callback) {
	api.swarmlicant_scale(trove_ids, trove_size, trove_number, callback);
};

swarmlicator.swarmlicant_reset = function(ids, callback) {
	api.swarmlicant_reset(ids, callback);
};

module.exports = swarmlicator;