function getBaseDamage(damageType: string, unitType: string) {
  squadtd.Validator.Validate([[damageType, 'string'], [unitType,'string']]);
  return squadtd.Calculator.baseDamage(damageType, unitType);
}

function getDPS(dmgMin: number, dmgMax: number, speed: number) {
  squadtd.Validator.Validate([[dmgMin, 'number'], [dmgMax,'number'], [speed, 'number']]);
  return squadtd.Calculator.DPS(dmgMin, dmgMax, speed);
}