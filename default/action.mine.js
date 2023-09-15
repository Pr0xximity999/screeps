var actionMine = {
    /** @param {Creep} creep **/
    run:function(creep){
        if(creep.store.getFreeCapacity() <= 0)
        {
            creep.memory.working = true
        }
        if(creep.store.energy <= 0){
            
            creep.memory.working = false;
        }
        if(creep.store.getFreeCapacity() > 0 && creep.memory.working == false){
            var sources = creep.pos.findClosestByRange(FIND_SOURCES)
            creep.say("⛏")
            if(creep.harvest(sources) == ERR_NOT_IN_RANGE){
                creep.moveTo(sources, { visualizePathStyle: { stroke: '#ffaa00' } });
            }
            return true
        }
        else{
            return false
        }
    }
}

module.exports = actionMine;