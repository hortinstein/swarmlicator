


// ***need to declare this dynamically later 
// var size_def = function(size) {
//   [ { id: 66, name: '512MB' },
//      { id: 63, name: '1GB' },
//      { id: 62, name: '2GB' },
//      { id: 64, name: '4GB' },
//      { id: 65, name: '8GB' },
//      { id: 61, name: '16GB' },
//      { id: 60, name: '32GB' },
//      { id: 70, name: '48GB' },
//      { id: 69, name: '64GB' },
//      { id: 68, name: '96GB' } ]
// }

var digital_ocean = require('brinydeep');

var api = {};

api.setup = function(provider_info) {
  
}

api.swarmite_init = function(size, config, callback) {
    
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