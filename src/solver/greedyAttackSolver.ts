import { Calculator } from "../calculator";
import { PlayerUnit } from "../unit/playerUnit";
import { WaveUnit } from "../unit/waveUnit";
import { Solver } from "./solver";

export class GreedyAttackSolver extends Solver {
  public getNames(): string[] {
    throw new Error("Method not implemented.");
  }
  public getName(): string {
    return "Greedy Attack Algorithm";
  }
  public solveWave(number: number): PlayerUnit[] {
    let attacker: WaveUnit = this.waves[number - 1].vUnit;

    let bestDps: number = 0;
    let bestUnit;
    for (let i = 0; i < this.units.length; i++) {
      let unit: PlayerUnit = this.units[i];
      let dps =
        unit.DPS() * Calculator.baseDamage(unit.attackType, attacker.armorType);
      if (dps > bestDps) {
        bestDps = dps;
        bestUnit = unit;
      }
    }

    return [bestUnit];
  }
}
