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

    public static GetHP(hp:number, wave:number) : number {
      let bonus = wave * this.hpPerWave;
      var total = hp * (1 + bonus);
      if(wave <= 3) return Math.floor(total);
      return Math.ceil(total);
    }

    public static GetSpeed(speed:number, wave:number) : number {
      let bonus = wave * this.speedPerWave;
      let total = speed * (1 - bonus);
      return Number(total.toFixed(2));
    }
    
    public bonusMaxAttack:number;
    public bonusMinAttack:number;
    public bonusAttackSpeed:number;
    public bonusLife:number;

    constructor(name?:string, wave?:number, reward?:number, life?:number, armorType?:UnitType, 
      attackType?:DamageType, minAttack?:number, maxAttack?:number, 
      attackSpeed?:number, moveSpeed?:number, range?:number) {
        super(name, wave, reward, life, armorType, attackType, minAttack, maxAttack, attackSpeed, moveSpeed, range);
        this.setupVeteranData(this.wave, this.attackSpeed, this.minAttack, this.maxAttack, this.hp);
      }

    private setupVeteranData(wave:number, atkSpeed:number, min:number, max:number, life:number) {
      let vetSpeed = VeteranUnit.GetSpeed(atkSpeed, wave);
      let vetMinAtk = VeteranUnit.GetDamage(min, wave);
      let vetMaxAtk = VeteranUnit.GetDamage(max, wave);
      let vetHP = VeteranUnit.GetHP(life, wave);
      this.bonusMaxAttack = vetMaxAtk - this.maxAttack;
      this.bonusMinAttack = vetMinAtk - this.minAttack;
      this.bonusLife = vetHP - this.hp;
      this.bonusAttackSpeed = this.attackSpeed - vetSpeed;
      this.maxAttack = vetMaxAtk;
      this.minAttack = vetMinAtk;
      this.attackSpeed = vetSpeed;
      this.hp = vetHP;
    }
    
    public copyFrom(other:WaveUnit){
      super.copyFrom(other);
      this.setupVeteranData(other.wave, other.attackSpeed, other.minAttack, other.maxAttack, other.hp);
    }

  }
}