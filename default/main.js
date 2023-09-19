var roleHarvester = require("role.harvester")
var roleUpgrader = require("role.upgrader")
var roleBuilder = require("role.builder") 
var roleRepairer = require("role.repairer") 
var roleJanitor = require("role.janitor") 
var roleGuard = require("role.guard") 
var roleTurret = require("role.turret") 
   
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
    var guards  = _.filter(Game.creeps, (creep) => creep.memory.role == "guard");

    var towers = Game.spawns["Spawn1"].room.find(FIND_MY_STRUCTURES, { filter: { structureType: STRUCTURE_TOWER } });
    
    if(guards.length < 2){
        Game.spawns["Spawn1"].spawnCreep([TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, MOVE, MOVE, MOVE, MOVE], "Guard" + Game.time, {memory:{role:'guard', working:false}});
    }
    else if(harvesters.length < 3){
        Game.spawns["Spawn1"].spawnCreep([WORK, WORK, WORK, WORK, WORK, MOVE, MOVE, CARRY, CARRY, CARRY], "Harvester" + Game.time, {memory:{role:'harvester', working:false}});
        Game.spawns["Spawn1"].spawnCreep([WORK, WORK, WORK, MOVE, MOVE, CARRY, CARRY], "Harvester" + Game.time, {memory:{role:'harvester', working:false}});
        Game.spawns["Spawn1"].spawnCreep([WORK, WORK, MOVE, CARRY], "Harvester" + Game.time, {memory:{role:'harvester', working:false}});
    }
    else if(upgraders.length < 3){
        Game.spawns["Spawn1"].spawnCreep([WORK, WORK, WORK, WORK, WORK, MOVE, MOVE, MOVE, MOVE, CARRY, CARRY, CARRY, CARRY], "Upgrader" + Game.time, {memory:{role:'upgrader', working:false}});
        Game.spawns["Spawn1"].spawnCreep([WORK, WORK, WORK, MOVE, CARRY], "Upgrader" + Game.time, {memory:{role:'upgrader', working:false}});
    }
    else if(builders.length < 4){
        Game.spawns["Spawn1"].spawnCreep([WORK, WORK, WORK, WORK, WORK, MOVE, MOVE, MOVE, MOVE, MOVE, CARRY, CARRY], "Upgrader" + Game.time, {memory:{role:'upgrader', working:false}});
        Game.spawns["Spawn1"].spawnCreep([WORK, WORK, WORK, MOVE, CARRY], "Builder" + Game.time, {memory:{role:'builder', working:false}});
    }
    else if(repairers.length < 3){
        Game.spawns["Spawn1"].spawnCreep([WORK, WORK, WORK, WORK, WORK, MOVE, MOVE, CARRY, CARRY], "Upgrader" + Game.time, {memory:{role:'upgrader', working:false}});
        Game.spawns["Spawn1"].spawnCreep([WORK, WORK, MOVE, MOVE, MOVE, CARRY], "repairer" + Game.time, {memory:{role:'repairer', working:false, repairing:false}});
    }
    else if(janitors.length < 1){
        Game.spawns["Spawn1"].spawnCreep([MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY], "Janitor" + Game.time, {memory:{role:'janitor', working:false}});
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
        if(creep.memory.role == "guard"){
            roleGuard.run(creep);
        }
    }
}