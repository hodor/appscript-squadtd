import { Calculator } from "../calculator";
import { DamageType } from "./dmgType";
import { UnitType } from "./unitType";

export class Effectiveness {
  public static effectiveDict = {};
  private static initialized: boolean = false;

  public static Init() {
    if (Effectiveness.initialized) return;
    for (let uKey in UnitType) {
      let armor = UnitType[uKey];
      Effectiveness.effectiveDict[armor] = {
        damage: 0,
        type: new Array()
      };

      // Get the first biggest damage
      let bestWeapon = "null";
      let bestDamage = 0;
      for (let dKey in DamageType) {
        let weapon = DamageType[dKey];
        let damage = Calculator.baseDamage(weapon, armor);
        if (damage > bestDamage) {
          bestWeapon = weapon;
          bestDamage = damage;
        }
      }
      Effectiveness.effectiveDict[armor].damage = bestDamage;
      Effectiveness.effectiveDict[armor].type.push(bestWeapon);

      // Get all the equivalent damage
      weaponLoop: for (let dKey in DamageType) {
        let weapon = DamageType[dKey];
        // Don't add damage types that we already have
        for (let i in Effectiveness.effectiveDict[armor].type) {
          if (Effectiveness.effectiveDict[armor].type[i] == weapon) {
            continue weaponLoop;
          }
        }
        let damage = Calculator.baseDamage(weapon, armor);
        if (damage == Effectiveness.effectiveDict[armor].damage) {
          Effectiveness.effectiveDict[armor].type.push(weapon);
        }
      }
    }
    Effectiveness.initialized = true;
  }

  public static mostEffectiveAgainst(armor: string): DamageType[] {
    if (!Effectiveness.initialized) Effectiveness.Init();

    if (!Calculator.isUnitTypeValid(armor))
      throw Utilities.formatString("Unit type %s is not valid", armor);

    return Effectiveness.effectiveDict[UnitType[armor.toLowerCase()]].type;
  }
}
