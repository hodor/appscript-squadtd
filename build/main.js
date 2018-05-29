var damageTypes = { 
  normal: 'Normal', 
  piercing: 'Piercing', 
  magic: 'Magic', 
  siege: 'Siege', 
  chaos: 'Chaos'
};

var unitTypes = {
  armored: 'Armored', 
  light: 'Light', 
  massive: 'Massive', 
  mechanical: 'Mechanical', 
  biological: 'Biological'
};

function isValidDamageType(unit){
  for(var d in damageTypes){
    if(damage.toUpperCase() == damageTypes[d].toUpperCase()){
      return true;
    }
  }
  return false;
}

/**
* Get how effective a damage type is for a given unit
* @param {String} damage The damage type
* @param {String} unit The unit type
*/
function getDamageBonus(damage, unit) {
  var found = false;
  for(var u in unitTypes){
    if(unit.toUpperCase() == unitTypes[u].toUpperCase()) {
      found = true;
      break;
    }
  }
  
  if(!found){
    Logger.log('Invalid unit type'+unit);
    return 'Invalid unit type '+ unit;
  }
  
  found = false;
  for(var d in damageTypes){
    if(damage.toUpperCase() == damageTypes[d].toUpperCase()){
      found = true;
      break;
    }
  }
  
  if(!found){
    Logger.log('Invalid damage type'+damage);
    return 'Invalid damage type ' + damage ;
  }
  
  if(unit == unitTypes.biological || damage == damageTypes.chaos)
    return 1;
  
  switch(damage) {
    case damageTypes.normal:
      switch(unit){
        case unitTypes.armored:
          return 1.2;
        case unitTypes.light:
          return .9;
        case unitTypes.massive:
          return .9;
        case unitTypes.mechanical:
          return .8;
      }
    case damageTypes.piercing:
      switch(unit){
        case unitTypes.armored:
          return .8;
        case unitTypes.light:
          return 1.3;
        case unitTypes.massive:
          return .9;
        case unitTypes.mechanical:
          return .7;
      }
    case damageTypes.magic:
      switch(unit){
        case unitTypes.armored:
          return .8;
        case unitTypes.light:
          return 1.1;
        case unitTypes.massive:
          return 1.2;
        case unitTypes.mechanical:
          return .7;
      }
    case damageTypes.siege:
      switch(unit){
        case unitTypes.armored:
          return .9;
        case unitTypes.light:
          return .9;
        case unitTypes.massive:
          return .9;
        case unitTypes.mechanical:
          return 1.25;
      }
  }
}

function damageAgainstAll(damageType, dps) {
  
}
