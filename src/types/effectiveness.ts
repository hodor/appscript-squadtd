namespace squadtd {
  export namespace Effectiveness {
    let effectiveDict = {}
    let initialized:boolean = false;

    export function Init(){
      if(initialized) return;
      for(let uKey in UnitType) {
        let armor = UnitType[uKey];
        effectiveDict[armor] = {
          damage: 0,
          type: new Array()
        }
      
        // Get the first biggest damage
        let bestWeapon = 'null';
        let bestDamage = 0;
        for(let dKey in DamageType) {
          let weapon = DamageType[dKey];
          let damage = Calculator.baseDamage(weapon, armor);
          if(damage > bestDamage) {
            bestWeapon = weapon;
            bestDamage = damage;
          }
        }
        effectiveDict[armor].damage = bestDamage;
        effectiveDict[armor].type.push(bestWeapon);

        // Get all the equivalent damage
        weaponLoop:
        for(let dKey in DamageType) {
          let weapon = DamageType[dKey];
          // Don't add damage types that we already have
          for(let i in effectiveDict[armor].type){
            if(effectiveDict[armor].type[i] == weapon)
            {
              continue weaponLoop;
            }
          }
          let damage = Calculator.baseDamage(weapon, armor);
          if(damage == effectiveDict[armor].damage) {
            effectiveDict[armor].type.push(weapon);
          }
        }
      }
      initialized = true;
    }

    export function mostEffectiveAgainst(armor:string) : DamageType[] {
      if(!initialized)
        Init();

      if(!Calculator.isUnitTypeValid(armor))
        throw Utilities.formatString('Unit type %s is not valid', armor);
      
      return effectiveDict[UnitType[armor.toLowerCase()]].type;
    }
  }
}