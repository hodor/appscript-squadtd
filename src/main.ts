/// <reference path="wave/waveFacade.ts"/>
//// DAMAGE
function getBaseDamage(damageType: string, unitType: string) {
  squadtd.Validator.Validate([[damageType, 'string'], [unitType,'string']]);
  return squadtd.Calculator.baseDamage(damageType, unitType);
}

function getDPS(dmgMin: number, dmgMax: number, speed: number) {
  squadtd.Validator.Validate([[dmgMin, 'number'], [dmgMax,'number'], [speed, 'number']]);
  return squadtd.Calculator.DPS(dmgMin, dmgMax, speed);
}

function getDPSCostBenefit(cost:number, supply:number, dps:number){
  squadtd.Validator.Validate([[cost, 'number'], [supply,'number'], [dps, 'number']]);
  return squadtd.Calculator.DPSCostBenefit(cost, supply, dps);
}

//// VETERAN
function vetDamage(ammount:number, wave:number) {
  squadtd.Validator.Validate([[ammount, 'number'], [wave,'number']]);
  return squadtd.VeteranUnit.GetDamage(ammount, wave);
}

function vetLife(ammount:number, wave:number) {
  squadtd.Validator.Validate([[ammount, 'number'], [wave,'number']]);
  return squadtd.VeteranUnit.GetLife(ammount, wave);
}

function vetSpeed(ammount:number, wave:number) {
  squadtd.Validator.Validate([[ammount, 'number'], [wave,'number']]);
  return squadtd.VeteranUnit.GetSpeed(ammount, wave);
}

//// WAVE
function waveReward(wave:number) {
  squadtd.Validator.Validate([[wave, 'number']]);
  return squadtd.WaveFacade.GetWaveReward(wave);
}

function terratron(wave:number){
  squadtd.Validator.Validate([[wave, 'number']]);
  let terratron:squadtd.WaveUnit = squadtd.WaveFacade.Terratron(wave)
  let answer:Array<any> = new Array();
  answer.push(new Array());
  answer[0].push(terratron.life);
  answer[0].push(terratron.moveSpeed);
  answer[0].push(terratron.range);
  answer[0].push(terratron.minAttack);
  answer[0].push(terratron.maxAttack);
  answer[0].push(terratron.attackSpeed);
  return answer;
}