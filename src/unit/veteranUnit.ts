/// <reference path="waveUnit.ts"/>
namespace squadtd {
  export class VeteranUnit extends WaveUnit {
    _bonusMaxAttack:number;
    _bonusMinAttack:number;
    _bonusAttackSpeed:number;
    _bonusLife:number;

    constructor(name:string, wave:number, reward:number, life:number, armorType:UnitType, 
      attackType:DamageType, minAttack:number, maxAttack:number, 
      attackSpeed:number, moveSpeed:number, range:number) {
        super(name, wave, reward, life, armorType, attackType, minAttack, maxAttack, attackSpeed, moveSpeed, range);
        let vetSpeed = Veteran.GetSpeed(this._attackSpeed, this._wave);
        let vetMinAtk = Veteran.GetDamage(this._minAttack, this._wave);
        let vetMaxAtk = Veteran.GetDamage(this._maxAttack, this._wave);
        let vetLife = Veteran.GetLife(this._life, this._wave);
        this._bonusMaxAttack = vetMaxAtk - this._maxAttack;
        this._bonusMinAttack = vetMinAtk - this._minAttack;
        this._bonusLife = vetLife - this._life;
        this._bonusAttackSpeed = this._attackSpeed - vetSpeed;
        this._maxAttack = vetMaxAtk;
        this._minAttack = vetMinAtk;
        this._attackSpeed = vetSpeed;
        this._life = vetLife;
      }

      public BonusAttackMin():number {
        return this._bonusMinAttack;
      }

      public BonusAttackMax():number {
        return this._bonusMaxAttack;
      }

      public BonusAttackSpeed():number {
        return this._bonusAttackSpeed;
      }

      public BonusLife():number {
        return this._bonusLife;
      }

  }
}