/// <reference path="../unit/waveUnit.ts"/>
namespace squadtd {
  export class WaveFacade {
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
  }
}