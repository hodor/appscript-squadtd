namespace squadtd {
  export class Calculator {
    constructor() {

    }

    private static isUnitTypeValid(unit: string): boolean {
      for (const key in UnitType) {
        const value = UnitType[key];
        if (value.toUpperCase() === unit.toUpperCase())
          return true;
      }
      return false;
    }

    private static isDamageTypeValid(damage: string): boolean {
      for (const key in DamageType) {
        const value = DamageType[key];
        if (value.toUpperCase() === damage.toUpperCase())
          return true;
      }
      return false;
    }

    public static baseDamage(damage: string, unit: string): number {
      if(!this.isDamageTypeValid(damage)) throw Utilities.formatString('Invalid damage type: %s', damage);
      if(!this.isUnitTypeValid(unit)) throw Utilities.formatString('Invalid unit type %s', unit);

      damage = damage.toUpperCase();
      unit = unit.toUpperCase();

      if (damage == DamageType.chaos || unit == UnitType.biological)
        return 1;

      switch (damage) {
        case DamageType.normal:
          switch (unit) {
            case UnitType.armored:
              return 1.2;
            case UnitType.light:
              return .9;
            case UnitType.massive:
              return .9;
            case UnitType.mechanical:
              return .8;
          }
        case DamageType.magic:
          switch (unit) {
            case UnitType.armored:
              return .8;
            case UnitType.light:
              return 1.1;
            case UnitType.massive:
              return 1.2;
            case UnitType.mechanical:
              return .7;
          }
        case DamageType.piercing:
          switch (unit) {
            case UnitType.armored:
              return .8;
            case UnitType.light:
              return 1.3;
            case UnitType.massive:
              return .9;
            case UnitType.mechanical:
              return .7;
          }
        case DamageType.siege:
          switch (unit) {
            case UnitType.armored:
              return .9;
            case UnitType.light:
              return .9;
            case UnitType.massive:
              return .9;
            case UnitType.mechanical:
              return 1.25;
          }
      }
      throw Utilities.formatString('Could not find any relationship between damage type %s and unit type %s', damage, unit);
    }

    public static DPS(damageMin: number, damageMax: number, speed: number): number {
      // Speed is 1 - 1second, 0.2 - 200ms
      return ((damageMin + damageMax) / 2) / speed;
    }

    public static DPSCostBenefit(cost: number, supply:number, dps:number): number {
      return (dps*dps) / cost;
    }
  }
}