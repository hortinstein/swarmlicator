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

api.swarmlicant_init = function(size, name, callback) {
	var swarmite_info = {};
	swarmite_info.name = name;
	swarmite_info.size = sizes[size];
	swarmite_info.image_id = image_id;
	swarmite_info.region_id = region_id;

	brinydeep.new_droplets(swarmite_info, function(e, o) {
        var ids_created_this_session = [];
		if (Array.isArray(o)){
			for (var droplet in o) {
				var id = o[droplet].droplet.id;
				//console.log(id);
				ids_created_this_session.push(id);
			}
		} else {
			var id = o.droplet.id;
			ids_created_this_session.push(id); 
		}
        callback(e,ids_created_this_session);
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