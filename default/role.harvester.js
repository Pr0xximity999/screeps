var actionMine = require("action.mine")

var roleHarvester = {
    /** @param {Creep} creep **/
    run : function(creep){
        if(!actionMine.run(creep)){
            creep.say("📦")
            var targets = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_SPAWN || structure.structureType == STRUCTURE_EXTENSION) &&
                        structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
                }
            });
            if(targets.length > 0){
                if(creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
                    creep.moveTo(targets[0], { visualizePathStyle: { stroke: '#ffaa00' } }); 
                }
            }
        }
    }
}
module.exports = roleHarvester;