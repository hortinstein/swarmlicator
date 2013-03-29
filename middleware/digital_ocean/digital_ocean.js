
var digital_ocean = require('brinydeep');

var swarm_init = function (input_json, callback){
	try {
		var api_key = input_json.provider_info.api_info.api_key;
		var client_key = input_json.provider_info.api_info.client_key;
		var vm_image = input_json.provider_info.vm_image_id;
		var region_id = input_json.provider_info.region_id;
		var curator_size = input_json.schematic.curator_size;
		var trove_size = input_json.schematic.trove_size;
		


	} catch(err){
		callback(err,null);
	}


};
var curator_scale = function (curator_id, size, callback){

};
var trove_scale = function (trove_ids, trove_size, trove_number, callback){

};
var swarmite_reset = function (ids, callback){
    
}
var destroy_swarm = function (ids, callback){
    
}