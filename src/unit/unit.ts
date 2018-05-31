namespace squadtd {
  //When working on GAS, we need to make sure that the base class of any child class extends from Object.
  export class Unit {
    public name:string;
    public hp:number = 0;
    public moveSpeed:number;
    public range:number;
    public minAttack:number;
    public maxAttack:number;
    public attackSpeed:number;
    public armorType:UnitType;
    public attackType:DamageType;
  
    constructor(name?:string, life?:number, armorType?:UnitType, attackType?:DamageType, 
        minAttack?:number, maxAttack?:number, attackSpeed?:number, moveSpeed?:number, range?:number) {
      this.name = name || '';
      this.hp = life || 0;
      this.armorType = armorType || UnitType.biological;
      this.attackType = attackType || DamageType.chaos;
      this.minAttack = minAttack || 0;
      this.maxAttack = maxAttack || 0;
      this.attackSpeed = attackSpeed || 0;
      this.moveSpeed = moveSpeed || 0;
      this.range = range || 0;
    }

    public DPS():number {
      return Calculator.DPS(this.minAttack, this.maxAttack, this.attackSpeed);
    }

    public copyFrom(other:Unit){
      this.name = other.name;
      this.hp = other.hp;
      this.armorType = other.armorType;
      this.attackType = other.attackType;
      this.minAttack = other.minAttack;
      this.maxAttack = other.maxAttack;
      this.attackSpeed = other.attackSpeed;
      this.moveSpeed = other.moveSpeed;
      this.range = other.range;
    }

  }
}