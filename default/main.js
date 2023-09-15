var roleHarvester = require("role.harvester")
var roleUpgrader = require("role.upgrader")
var roleBuilder = require("role.builder") 
var roleRepairer = require("role.repairer") 
var roleJanitor = require("role.janitor") 
   
for(var name in Game.creeps){
    if(name.includes("Harvester")){
        Game.creeps[name].memory.role = "harvester"
        Game.creeps[name].memory.working = false
    }
    if(name.includes("Upgrader")){
        Game.creeps[name].memory.role = "upgrader"
        Game.creeps[name].memory.working = false
    }
    if(name.includes("Builder")){
        Game.creeps[name].memory.role = "builder"
        Game.creeps[name].memory.working = false
    }
}

module.exports.loop = function () {
    var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == "harvester");
    var upgraders  = _.filter(Game.creeps, (creep) => creep.memory.role == "upgrader");
    var builders  = _.filter(Game.creeps, (creep) => creep.memory.role == "builder");
    var repairers  = _.filter(Game.creeps, (creep) => creep.memory.role == "repairer");
    var janitors  = _.filter(Game.creeps, (creep) => creep.memory.role == "janitor");

    if(harvesters.length < 4){
        Game.spawns["Spawn1"].spawnCreep([WORK, WORK, MOVE, CARRY], "Harvester" + Game.time, {memory:{role:'harvester', working:false}});
    }
    else if(upgraders.length < 5){
        Game.spawns["Spawn1"].spawnCreep([WORK, WORK, WORK, MOVE, CARRY], "Upgrader" + Game.time, {memory:{role:'upgrader', working:false}});
    }
    else if(builders.length < 5){
        Game.spawns["Spawn1"].spawnCreep([WORK, WORK, WORK, MOVE, CARRY], "Builder" + Game.time, {memory:{role:'builder', working:false}});
    }
    else if(builders.length < 4){
        Game.spawns["Spawn1"].spawnCreep([WORK, WORK, WORK, MOVE, CARRY], "repairer" + Game.time, {memory:{role:'repairer', working:false, repairing:false}});
    }
    else if(janitors.length < 0){
        Game.spawns["Spawn1"].spawnCreep([WORK, WORK, MOVE, MOVE, MOVE, CARRY], "Janitor" + Game.time, {memory:{role:'janitor', working:false}});
    }
    
    for(var name in Memory.creeps){
        if(!Game.creeps[name]) {
            delete Memory.creeps[name]
        }
    }

    for(var name in Game.creeps){
        var creep = Game.creeps[name];
        if(creep.memory.role == "harvester"){
            roleHarvester.run(creep);
        }
        if(creep.memory.role == "upgrader"){
            roleUpgrader.run(creep);
        }
        if(creep.memory.role == "builder"){
            roleBuilder.run(creep);
        }
        if(creep.memory.role == "repairer"){
            roleRepairer.run(creep);
        }
        if(creep.memory.role == "janitor"){
            roleJanitor.run(creep);
        }
    }
}