var roleJanitor = {
    /** @param {Creep} creep **/
    run : function(creep){
        creep.say("🗑")
        var targets = creep.room.find(FIND_RUINS);
        if(targets.length > 0 && creep.store.getFreeCapacity > 0){
            if(Game.structures[targets[0]].transferEnergy(creep) == ERR_NOT_IN_RANGE){
                creep.moveTo(targets[0], { visualizePathStyle: { stroke: '#fffff' } }); 
            }
        }
        else{
            creep.say("📦")
            if(creep.transfer(Game.spawns["Spawn1"], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
                creep.moveTo(targets[0], { visualizePathStyle: { stroke: '#fffff' } }); 
            }
        }
    }
}
module.exports = roleJanitor;