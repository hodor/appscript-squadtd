import { Unit } from "./unit";
import { UnitType } from "../types/unitType";
import { DamageType } from "../types/dmgType";

export class WaveUnit extends Unit {
  public wave: number;
  public reward: number;

  constructor(
    name?: string,
    wave?: number,
    reward?: number,
    hp?: number,
    armorType?: UnitType,
    attackType?: DamageType,
    minAttack?: number,
    maxAttack?: number,
    attackSpeed?: number,
    moveSpeed?: number,
    range?: number
  ) {
    super(
      name,
      hp,
      armorType,
      attackType,
      minAttack,
      maxAttack,
      attackSpeed,
      moveSpeed,
      range
    );
    this.wave = wave || 0;
    this.reward = reward || 0;
  }

  public copyFrom(other: WaveUnit) {
    super.copyFrom(other);
    this.wave = other.wave;
    this.reward = other.reward;
  }
}
