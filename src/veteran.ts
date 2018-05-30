namespace squadtd {
  export class Veteran {
    private static damagePerWave = .02;
    private static hpPerWave = .02;
    private static speedPerWave = .01;
    public static GetDamage(damage:number, wave:number) : number {
      let bonus = wave * this.damagePerWave;
      return damage * (1 + bonus);
    }

    public static GetLife(life:number, wave:number) : number {
      let bonus = wave * this.hpPerWave;
      var total = life * (1 + bonus);
      if(wave <= 3) return Math.floor(total);
      return Math.ceil(total);
    }

    public static GetSpeed(speed:number, wave:number) : number {
      let bonus = wave * this.speedPerWave;
      let total = speed * (1 - bonus);
      return Number(total.toFixed(2));
    }
  }
}