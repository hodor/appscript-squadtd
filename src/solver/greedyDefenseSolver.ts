import { Calculator } from "../calculator";
import { PlayerUnit } from "../unit/playerUnit";
import { WaveUnit } from "../unit/waveUnit";
import { Solver } from "./solver";

export class GreedyDefenseSolver extends Solver {
  public getNames(): string[] {
    throw new Error("Method not implemented.");
  }
  public getName(): string {
    return "Greedy Defense Algorithm";
  }
  public solveWave(number: number): PlayerUnit[] {
    let attacker: WaveUnit = this.waves[number - 1].vUnit;

    let bestSecondsToDie: number = 0;
    let bestUnit: PlayerUnit;
    for (let i = 0; i < this.units.length; i++) {
      let unit: PlayerUnit = this.units[i];
      let secondsToDie =
        unit.hp /
        (attacker.DPS() *
          Calculator.baseDamage(attacker.attackType, unit.armorType));
      if (secondsToDie > bestSecondsToDie) {
        bestSecondsToDie = secondsToDie;
        bestUnit = unit;
      }
    }

    return [bestUnit];
  }
}
