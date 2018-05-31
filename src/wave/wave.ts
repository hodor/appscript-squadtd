namespace squadtd {
  export class Wave {
    protected number:number;
    protected reward:number;
    protected unitCount:number;
    protected unit:WaveUnit;
    protected vUnit:VeteranUnit;

    constructor(number:number, unit:WaveUnit, unitCount:number) {
      this.number = number;
      this.unit = unit;
      this.unitCount = unitCount;
      this.vUnit = new VeteranUnit();
      this.vUnit.copyFrom(unit);
      this.reward = WaveFacade.GetWaveReward(number);
    }
  }
}