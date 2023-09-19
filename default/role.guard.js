var roleGuard = {
    /** @param {Creep} creep **/
    run : function(creep){
        var targets = creep.room.find(FIND_HOSTILE_CREEPS);
        if(targets.length > 0){
            creep.say("🔪 :)")
            if(creep.attack(targets[0]) == ERR_NOT_IN_RANGE){
                creep.moveTo(targets[0])
            }
        }
        else{
            creep.say("No 🔪 :(")
            creep.moveTo(30, 24);
        }
    }
}
module.exports = roleGuard;