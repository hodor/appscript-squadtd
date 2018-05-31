namespace squadtd {
  export class PlayerUnit extends Unit {
    public cost: number;
    public baseUnit: PlayerUnit;
    private energy: number;

    constructor(name?: string, cost?: number, baseUnit?: PlayerUnit, hp?: number, energy?: number, armorType?: UnitType,
      attackType?: DamageType, minAtk?: number, maxAtk?: number,
      atkSpeed?: number, moveSpeed?: number, range?: number) {
      super(name, hp, armorType, attackType, minAtk, maxAtk, atkSpeed, moveSpeed, range);
      this.baseUnit = baseUnit || null;
      this.cost = cost || 0;
      this.energy = energy || 0;
    }

    public getCost(): number {
      let totalCost = this.cost;
      if(this.baseUnit)
        totalCost += this.baseUnit.getCost();
      return totalCost;
    }
  }
}