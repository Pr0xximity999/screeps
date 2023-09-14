var actionMine = require("action.mine")
var roleBuilder = {
    /** @param {Creep} creep **/
    run : function(creep){
        if(!actionMine.run(creep)){
            creep.say("⚒")
            creep.memory.working = true
            if(creep.store.energy == 0){
                creep.memory.working = false
            }
            var site = creep.pos.findClosestByRange(FIND_CONSTRUCTION_SITES)
            if(creep.build(site) == ERR_NOT_IN_RANGE){
                creep.moveTo(site, { visualizePathStyle: { stroke: '#00FFFF,' } }); 
            }
        }
    }
}
module.exports = roleBuilder;