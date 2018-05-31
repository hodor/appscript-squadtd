namespace squadtd {
  export class PlayerUnit extends Unit {
    public cost: number;
    public baseUnit: PlayerUnit;
    constructor(name?: string, cost?: number, baseUnit?: PlayerUnit, life?: number, armorType?: UnitType,
      attackType?: DamageType, minAtk?: number, maxAtk?: number,
      atkSpeed?: number, moveSpeed?: number, range?: number) {
      super(name, life, armorType, attackType, minAtk, maxAtk, atkSpeed, moveSpeed, range);
      this.baseUnit = baseUnit || null;
      this.cost = cost || 0;
    }

    public getCost(): number {
      let totalCost = this.cost;
      if(this.baseUnit)
        totalCost += this.baseUnit.getCost();
      return totalCost;
    }
  }
}