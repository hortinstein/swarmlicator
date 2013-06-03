//modular for future expansion to other APIs
var api = "";

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
	var req_attr = ["provider_info"];
	check_req_attr(config, req_attr);
	switch (config.provider_info.provider_id) {
		case "digital_ocean":
			api = require('./middleware/digital_ocean/digital_ocean.js');
			break;
	};
	api.setup(config.provider_info, callback);
};


swarmlicator.setOutput = function(file_location, callback) {
	
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

swarmlicator.swarm_init = function(config, m_callback) {
	var req_attr = ["provider_info", "name", "user", "application_servers",
			"storage_backend", "init_cookie", "username", "passcookie", "schematic"
	]
	check_req_attr(config, req_attr);
	// if (config.init !== "true" && config.init !== true) { //hacky...too lazy and slightly drunk to check if json intrepreter parses right
	// 	throw Error('Configuration blueprint is not for initial');
	// }

	var req_attr = ["curator_size", "trove_size", "troves"];
	check_req_attr(config.schematic, req_attr);

	var name = config.name;
	var curator_size = config.schematic.curator_size;
	var trove_size = config.schematic.trove_size;
	var trove_number = config.schematic.troves;

	var async = require("async");
	async.parallel({
		//curator init
		curator: function(callback) {
			swarmlicator.swarmlicant_init(1, curator_size, name + "-curator", callback)
		},
		//trove init
		troves: function(callback) {
			swarmlicator.swarmlicant_init(trove_number, trove_size, name + "-trove", callback)
		}
	},

	function(err, results) {
		delete config.schematic;
		config.schematic = results;
		m_callback(err, config);
	});
}

swarmlicator.swarmlicant_destroy = function(ids, callback) {
	api.swarmlicant_destroy(ids, callback);
};

swarmlicator.swarmlicant_init = function(number, size, name, callback) {
	var async = require('async');
	async.times(number, function(n, next) {
		//console.log(n, next);
		api.swarmlicant_init(size, name, function(err, droplet) {
			next(err, droplet);
		});
	}, function(e, swarm) {
		if (e) {
			callback(e, swarm);
		} else {
			//console.log(e, swarm);
			var ids = [];
			if (swarm.length === 1) { //looks cleaner with this slight hack
				ids = swarm[0].droplet.id;

			} else {
				swarm.forEach(function(machine) {
					ids.push(machine.droplet.id);
				});
			}
			//console.log(ids);
			api.get_ips(ids, callback);
			//should return the array of troves ips/ids
		}
	});
};

swarmlicator.swarmlicant_scale = function(trove_ids, swarmlicant_size, callback) {
	api.swarmlicant_scale(trove_ids, trove_size, trove_number, callback);
};

swarmlicator.swarmlicant_reset = function(ids, callback) {
	api.swarmlicant_reset(ids, callback);
};

module.exports = swarmlicator;