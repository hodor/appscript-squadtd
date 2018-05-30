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
  }
}