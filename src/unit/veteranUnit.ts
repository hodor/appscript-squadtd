/// <reference path="waveUnit.ts"/>
namespace squadtd {
  export class VeteranUnit extends WaveUnit {
    private static damagePerWave = .02;
    private static hpPerWave = .02;
    private static speedPerWave = .01;
    public static GetDamage(damage:number, wave:number) : number {
      let bonus = wave * this.damagePerWave;
      return damage * (1 + bonus);
    }

    public static GetLife(life:number, wave:number) : number {
      let bonus = wave * this.hpPerWave;
      var total = life * (1 + bonus);
      if(wave <= 3) return Math.floor(total);
      return Math.ceil(total);
    }

    public static GetSpeed(speed:number, wave:number) : number {
      let bonus = wave * this.speedPerWave;
      let total = speed * (1 - bonus);
      return Number(total.toFixed(2));
    }
    
    _bonusMaxAttack:number;
    _bonusMinAttack:number;
    _bonusAttackSpeed:number;
    _bonusLife:number;

    constructor(name:string, wave:number, reward:number, life:number, armorType:UnitType, 
      attackType:DamageType, minAttack:number, maxAttack:number, 
      attackSpeed:number, moveSpeed:number, range:number) {
        super(name, wave, reward, life, armorType, attackType, minAttack, maxAttack, attackSpeed, moveSpeed, range);
        let vetSpeed = VeteranUnit.GetSpeed(this._attackSpeed, this._wave);
        let vetMinAtk = VeteranUnit.GetDamage(this._minAttack, this._wave);
        let vetMaxAtk = VeteranUnit.GetDamage(this._maxAttack, this._wave);
        let vetLife = VeteranUnit.GetLife(this._life, this._wave);
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