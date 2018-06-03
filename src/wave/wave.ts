/// <reference path="../unit/waveUnit.ts"/>
/// <reference path="../unit/veteranUnit.ts"/>

namespace squadtd {
  export class Wave {
    private static readonly startWaveReward:number = 13;
    public static GetWaveReward(wave:number):number 
    {
      let reward = this.startWaveReward;
      if(wave == 1) return reward;

      for(let i = 1; i < wave + 1; i ++){
        if(i - 1 == 0) continue
        reward += (i-1) % 3 == 0 ? 1 : 2;
      }
      return reward;
    }

    public static Terratron(wave:number) : WaveUnit {
      let upgrade = wave - 30;
      if(upgrade <= 0) throw Utilities.formatString('Cannot create Terratron on wave %s. Minimum Wave is 31', wave);
      upgrade -= 1;
      let baseLife = 5804;
      let baseMinAtk = 248
      let baseAtkDiff = 21;

      let hpPerUpgrade = 267;
      let atkPerUpgrade = 2.34;

      let life = baseLife + (hpPerUpgrade * upgrade);
      let atkMin = baseMinAtk + (Math.floor(atkPerUpgrade * upgrade));
      let atkMax = atkMin + baseAtkDiff;

      return new WaveUnit("Terratron", wave, 0, life, UnitType.biological, DamageType.chaos, atkMin, atkMax, 1, 4, 2.25);
    }

    public number:number;
    public reward:number;
    public unitCount:number;
    public unit:WaveUnit;
    public vUnit:VeteranUnit;

    constructor(number:number, unit:WaveUnit, unitCount:number) {
      this.number = number;
      this.unit = unit;
      this.unitCount = unitCount;
      this.vUnit = new VeteranUnit();
      this.vUnit.copyFrom(unit);
      this.reward = Wave.GetWaveReward(number);
    }

    public getMaximumReward(): number {
      return this.reward + (this.unit.reward * this.unitCount);
    }

    public getTotalHP(isVet:boolean): number {
      let unitHP = this.unit.hp;
      if(isVet) unitHP = this.vUnit.hp;
      return unitHP * this.unitCount;
    }
  }
}