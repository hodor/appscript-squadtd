/// <reference path="unit.ts"/>
namespace squadtd {
  export class WaveUnit extends Unit {
    protected _wave:number;
    protected _reward:number;

    constructor(name:string, wave:number, reward:number, life:number, armorType:UnitType, 
      attackType:DamageType, minAttack:number, maxAttack:number, 
      attackSpeed:number, moveSpeed:number, range:number) {
      super(name, life, armorType, attackType, minAttack, maxAttack, attackSpeed, moveSpeed, range);
      this._wave = wave;
      this._reward = reward;
    }

    public Wave():number{
      return this._wave;
    }

    public Reward():number{
      return this._reward;
    }
  }
}