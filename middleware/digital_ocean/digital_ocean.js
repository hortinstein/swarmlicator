var brinydeep = require('brinydeep');
var region_id = 0;
var image_id = 0;
var sizes = [];


var api = {};
var sizes = [];
//retrieves the latest sizes
api.size_def = function(callback) {
	sizes = brinydeep.sizes(function(e, o) {
		if (e) {
			//console.log(e);
			throw Error(e);
		} else {
			sizes = o.sizes;
			api.sizes = sizes; // exposing only for testing
			callback();
		}
	});
}

api.setup = function(provider_info, callback) {
	brinydeep.setup(provider_info.api_info.client_key,
	provider_info.api_info.api_key);
	region_id = provider_info.region_id;
	image_id = provider_info.image_id;
	api.size_def(callback);
};

swarmlicator.swarmlicant_id = function(id, callback) {
	var test_api_for_ip = function(id, callback) {
		brinydeep.show_droplets(id,function (e,r) {
			console.log(r);
			setTimeout(test_api_for_ip, 1000, address, callback);
		})
	}
	setTimeout(test_api_for_ip, 1000, address, callback);
};

api.swarmlicant_init = function(size, name, callback) {
	var swarmite_info = {};
	swarmite_info.name = name;
	swarmite_info.size = sizes[size];
	swarmite_info.image_id = image_id;
	swarmite_info.region_id = region_id;

	brinydeep.new_droplets(swarmite_info, function(e, o) {
		if (o) {
			var id = o.droplet.id;
		} else {
			callback('Droplets not created' + e);
		}

	});
};

api.swarmlicant_scale = function(id, size, callback) {
	brinydeep.resize(id, sizes[size], function(e, o) {
		callback();
	});
};

api.swarmlicant_destroy = function(id, callback) {
	brinydeep.destroy(id, function(e, o) {
		callback();
	});
};

api.swarmlicant_reset = function(id, callback) {
	brinydeep.reboot(id, function(e, o) {
		callback();
	});
};

//api.destroy_swarm = function(ids, callback) {

//};

module.exports = api;