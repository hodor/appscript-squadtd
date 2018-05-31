/// <reference path="unit.ts"/>
namespace squadtd {
  export class WaveUnit extends Unit {
    public wave:number;
    public reward:number;

    constructor(name?:string, wave?:number, reward?:number, life?:number, armorType?:UnitType, 
      attackType?:DamageType, minAttack?:number, maxAttack?:number, 
      attackSpeed?:number, moveSpeed?:number, range?:number) {
      super(name, life, armorType, attackType, minAttack, maxAttack, attackSpeed, moveSpeed, range);
      this.wave = wave || 0;
      this.reward = reward || 0;
    }

    public copyFrom(other:WaveUnit) {
      super.copyFrom(other);
      this.wave = other.wave;
      this.reward = other.reward;
    }
  }
}