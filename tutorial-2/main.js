var roleHarvester = require("role.harvester")
var roleUpgrader = require("role.upgrader")

for(var name in Game.creeps){
    if(name.includes("Harvester")){
        Game.creeps[name].memory.role = "harvester"
    }
    if(name.includes("Upgrader")){
        Game.creeps[name].memory.role = "upgrader"
    }
}

module.exports.loop = function () {
    if(Game.spawns["Spawn1"].energy >= 200 && Object.keys(Game.creeps).length < 5){
        Game.spawns["Spawn1"].spawnCreep([WORK, MOVE, CARRY], "Harvester" + (Object.keys(Game.creeps).length + 1));
    }
    
    for(var name in Game.creeps){
        var creep = Game.creeps[name];
        if(creep.memory.role == "harvester"){
            roleHarvester.run(creep);
        }
        if(creep.memory.role == "upgrader"){
            roleUpgrader.run(creep);
        }
    }
}