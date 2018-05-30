namespace squadtd {
  //When working on GAS, we need to make sure that the base class of any child class extends from Object.
  export class Unit {
    protected _name:string;
    protected _life:number = 0;
    protected _moveSpeed:number;
    protected _range:number;
    protected _minAttack:number;
    protected _maxAttack:number;
    protected _attackSpeed:number;
    protected _armorType:UnitType;
    protected _attackType:DamageType;

    constructor(name:string, life:number, armorType:UnitType, attackType:DamageType, minAttack:number, maxAttack:number, attackSpeed:number, moveSpeed:number, range:number) {
      this._name = name;
      this._life = life;
      this._armorType = armorType;
      this._attackType = attackType;
      this._minAttack = minAttack;
      this._maxAttack = maxAttack;
      this._attackSpeed = attackSpeed;
      this._moveSpeed = moveSpeed;
      this._range = range;
    }

    public DPS():number {
      return Calculator.DPS(this._minAttack, this._maxAttack, this._attackSpeed);
    }

    public Name() : string {
      return this._name;
    }

    public Life() : number {
      return this._life;
    }

    public MoveSpeed() : number {
      return this._moveSpeed;
    }

    public Range() : number {
      return this._range;
    }

    public AttackMin() : number {
      return this._minAttack;
    }

    public AttackMax() : number {
      return this._maxAttack;
    }

    public AttackSpeed() : number {
      return this._attackSpeed;
    }

    public AttackType() : DamageType {
      return this._attackType;
    }

    public ArmorType() : UnitType {
      return this._armorType;
    }
  }
}