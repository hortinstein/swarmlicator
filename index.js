//modular for future expansion to other APIs
var api = require('./middleware/digital_ocean/digital_ocean.js');


//these bind the primary functions to their API.  This is not 100% nessecary, but done for visibility and in case of future expansion.
//general error checking should be moved here eventually
var swarm_init = function(input_json, callback) {
    api.swarm_init(input_json,callback);
};

var curator_scale = function(curator_id, size, callback) {
    api.curator_scale(curator_id,size, callback);
};

var trove_scale = function(trove_ids, trove_size, trove_number, callback) {
    api.trove_size(trove_ids,trove_size,trove_number,callback);
};

var swarmite_reset = function(ids, callback) {
    api.swarmite_reset(ids,callback);
};

var destroy_swarm = function(ids, callback) {
    api.destroy_swarm(ids,callback);
};



//if the module is executed directly
if (!module.parent) {
    console.log("swarmlicator");
    var argv = require('optimist').argv;
    
} else { //being called as a module, expose the API

    var swarmlicator = {}; 
    swarmlicator.swarm_init = swarm_init;
    swarmlicator.curator_scale = curator_scale;
    swarmlicator.trove_scale = trove_scale;
    swarmlicator.swarmite_reset = swarmite_reset;
    swarmlicator.destroy_swarm = destroy_swarm;

}