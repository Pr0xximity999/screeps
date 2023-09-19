var actionMine = {
    /** @param {Creep} creep @param {Room} mineRoom**/
    run:function(creep, mineRoom = Game.spawns["Spawn1"].room){
        if(creep.store.getFreeCapacity() <= 0)
        {
            creep.memory.working = true
        }
        if(creep.store.energy <= 0){
            
            creep.memory.working = false;
        }
        if(creep.store.getFreeCapacity() > 0 && creep.memory.working == false){
            if(creep.room != mineRoom){
                creep.moveTo(creep.room.findExitTo(mineRoom))
                return true
            }
            
            var sources = creep.pos.findClosestByRange(FIND_SOURCES,{
                filter: (source) => {
                    return source.energy > 0
                }
            });
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