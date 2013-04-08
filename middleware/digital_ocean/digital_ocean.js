var digital_ocean = require('brinydeep');

var api = {};

api.swarm_init = function(input_json, callback) {
    try {
        var api_key = input_json.provider_info.api_info.api_key;
        var client_key = input_json.provider_info.api_info.client_key;
        var vm_image = input_json.provider_info.vm_image_id;
        var region_id = input_json.provider_info.region_id;
        var curator_size = input_json.schematic.curator_size;
        var trove_size = input_json.schematic.trove_size;
    }
    catch (err) {
        callback(err, null);
    }


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