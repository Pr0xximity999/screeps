var roleJanitor = {
    /** @param {Creep} creep **/
    run : function(creep){
        var ruin = creep.pos.findClosestByPath(FIND_RUINS);
        var tombstone = creep.pos.findClosestByPath(FIND_TOMBSTONES);
        var resource = creep.pos.findClosestByPath(FIND_DROPPED_RESOURCES);

        if(creep.store.getFreeCapacity() == 0)
        {
            creep.memory.working = false
        }
        if(creep.store.energy == 0){
            
            creep.memory.working = true;
        }
        
        if(creep.memory.working){
            creep.say("🗑")
            if(resource && resource.amount < 0){
                if(creep.withdraw(resource, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
                    creep.moveTo(resource, { visualizePathStyle: { stroke: '#fffff' } }); 
                    
                }
            }
            if(ruin && ruin.store.energy < 0){
                if(creep.withdraw(ruin, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
                    creep.moveTo(ruin, { visualizePathStyle: { stroke: '#fffff' } }); 
                }
            }
            if(tombstone && tombstone.store.energy < 0){
                if(creep.withdraw(tombstone, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
                    creep.moveTo(tombstone, { visualizePathStyle: { stroke: '#fffff' } }); 
                    
                }
            }
        }
        else{
            creep.say("📦")
            var targets = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_SPAWN || structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_TOWER) &&
                        structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
                }
            });
            if(targets.length > 0){
                if(creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
                    creep.moveTo(targets[0], { visualizePathStyle: { stroke: '#ffaa00' } }); 
                }
            }
            else{
                creep.moveTo(19, 28);
            }
        }
    }
}
module.exports = roleJanitor;