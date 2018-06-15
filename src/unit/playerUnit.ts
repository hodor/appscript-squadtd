import { UnitType } from "../types/unitType";
import { DamageType } from "../types/dmgType";
import { Unit } from "./unit";

export class PlayerUnit extends Unit {
  public cost: number;
  public baseUnit: PlayerUnit;
  public upgradeUnits: PlayerUnit[];
  public energy: number;

  constructor(
    name?: string,
    cost?: number,
    baseUnit?: PlayerUnit,
    upgradesTo?: PlayerUnit[],
    hp?: number,
    energy?: number,
    armorType?: UnitType,
    attackType?: DamageType,
    minAtk?: number,
    maxAtk?: number,
    atkSpeed?: number,
    moveSpeed?: number,
    range?: number
  ) {
    super(
      name,
      hp,
      armorType,
      attackType,
      minAtk,
      maxAtk,
      atkSpeed,
      moveSpeed,
      range
    );
    this.baseUnit = baseUnit || null;
    this.upgradeUnits = upgradesTo || new Array<PlayerUnit>();
    this.cost = cost || 0;
    this.energy = energy || 0;
  }

  public getCost(): number {
    let totalCost = this.cost;
    if (this.baseUnit) totalCost += this.baseUnit.getCost();
    return totalCost;
  }
}
