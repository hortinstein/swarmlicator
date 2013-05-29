var brinydeep = require('brinydeep');
var region_id = 0;
var image_id = 0;
var sizes = [];


var api = {};
var sizes = [];
//retrieves the latest sizes
api.size_def = function(callback) {
	brinydeep.sizes(function(e, o) {
		if (e) {
			throw Error(e);
		} else {
			sizes = o.sizes;
			api.sizes = sizes; // exposing only for testing
			callback();
		}
	});
}

api.get_ips = function (ids,callback) {
	brinydeep.get_ips(ids,callback);
}

api.setup = function(provider_info, callback) {
	brinydeep.setup(provider_info.api_info.client_key,
	provider_info.api_info.api_key);
	region_id = parseInt(provider_info.region_id);
	image_id = parseInt(provider_info.vm_image_id);
	api.size_def(callback);
};

api.swarmlicant_init = function(size, name, callback) {
	var swarmite_info = {};
	swarmite_info.name = name;
	swarmite_info.size_id = sizes[size].id;
	swarmite_info.image_id = image_id;
	swarmite_info.region_id = region_id;
	brinydeep.new_droplets(swarmite_info, function(e, o) {
		callback(e,o);
 });
};

api.swarmlicant_scale = function(id, size, callback) {
	size_id = sizes[size].id;
	brinydeep.resize(id, size_id, callback);
};

api.swarmlicant_reset = function(id, callback) {
	brinydeep.reboot(id, callback);
};

api.swarmlicant_destroy = function(ids, callback) {
	brinydeep.destroy(ids,callback);
};

module.exports = api;