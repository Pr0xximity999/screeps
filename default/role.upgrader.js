var actionMine = require("action.mine")
var roleUpgrader = {
    /** @param {Creep} creep **/
    run:function(creep){
        if(!actionMine.run(creep)){
            creep.say("upgrad :)")
            if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE){
                creep.moveTo(creep.room.controller, { visualizePathStyle: { stroke: '#ffaa00' } });
            }
        }
    }
}

module.exports = roleUpgrader;