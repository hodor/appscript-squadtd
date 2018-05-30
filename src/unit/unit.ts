namespace squadtd {
  //When working on GAS, we need to make sure that the base class of any child class extends from Object.
  export class Unit {
    public name:string;
    public life:number = 0;
    public moveSpeed:number;
    public range:number;
    public minAttack:number;
    public maxAttack:number;
    public attackSpeed:number;
    public armorType:UnitType;
    public attackType:DamageType;
  
    constructor(name?:string, life?:number, armorType?:UnitType, attackType?:DamageType, 
        minAttack?:number, maxAttack?:number, attackSpeed?:number, moveSpeed?:number, range?:number) {
      this.name = name;
      this.life = life;
      this.armorType = armorType;
      this.attackType = attackType;
      this.minAttack = minAttack;
      this.maxAttack = maxAttack;
      this.attackSpeed = attackSpeed;
      this.moveSpeed = moveSpeed;
      this.range = range;
    }

    public DPS():number {
      return Calculator.DPS(this.minAttack, this.maxAttack, this.attackSpeed);
    }

    public copyFrom(other:Unit){
      this.name = other.name;
      this.life = other.life;
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