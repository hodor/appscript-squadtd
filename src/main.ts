import { WaveData } from "./wave/waveData";
import { UnitData } from "./unit/unitData";
import { Writer } from "./output/writer";
import { Validator } from "./validator";
import { Calculator } from "./calculator";
import { Effectiveness } from "./types/effectiveness";
import { VeteranUnit } from "./unit/veteranUnit";
import { Wave } from "./wave/wave";
import { WaveUnit } from "./unit/waveUnit";

//// SPREADSHEET TRIGGERS
function onOpen() {
  WaveData.Init();
  UnitData.Init();
  Writer.Init();
}

function onEdit(e: any) {}

//// DAMAGE
function getBaseDamage(damageType: string, unitType: string) {
  Validator.Validate([[damageType, "string"], [unitType, "string"]]);
  return Calculator.baseDamage(damageType, unitType);
}

function getDPS(dmgMin: number, dmgMax: number, speed: number) {
  Validator.Validate([
    [dmgMin, "number"],
    [dmgMax, "number"],
    [speed, "number"]
  ]);
  return Calculator.DPS(dmgMin, dmgMax, speed);
}

function getDPSCostBenefit(cost: number, supply: number, dps: number) {
  Validator.Validate([[cost, "number"], [supply, "number"], [dps, "number"]]);
  return Calculator.DPSCostBenefit(cost, supply, dps);
}

function getMostEffective(against: string) {
  Validator.Validate([[against, "string"]]);
  var types = Effectiveness.mostEffectiveAgainst(against);
  var str = "";
  for (let i: number = 0; i < types.length; i++) {
    str += types[i];
    if (i + 1 < types.length) str += ", ";
  }
  return str;
}

//// VETERAN
function vetDamage(ammount: number, wave: number) {
  Validator.Validate([[ammount, "number"], [wave, "number"]]);
  return VeteranUnit.GetDamage(ammount, wave);
}

function vetLife(ammount: number, wave: number) {
  Validator.Validate([[ammount, "number"], [wave, "number"]]);
  return VeteranUnit.GetHP(ammount, wave);
}

function vetSpeed(ammount: number, wave: number) {
  Validator.Validate([[ammount, "number"], [wave, "number"]]);
  return VeteranUnit.GetSpeed(ammount, wave);
}

//// WAVE
function waveReward(wave: number) {
  Validator.Validate([[wave, "number"]]);
  return Wave.GetWaveReward(wave);
}

function terratron(wave: number) {
  Validator.Validate([[wave, "number"]]);
  let terratron: WaveUnit = Wave.Terratron(wave);
  let answer: Array<any> = new Array();
  answer.push(new Array());
  answer[0].push(terratron.hp);
  answer[0].push(terratron.moveSpeed);
  answer[0].push(terratron.range);
  answer[0].push(terratron.minAttack);
  answer[0].push(terratron.maxAttack);
  answer[0].push(terratron.attackSpeed);
  return answer;
}
