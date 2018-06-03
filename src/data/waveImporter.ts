/// <reference path="../data/importer.ts"/>
/// <reference path="../wave/wave.ts"/>

namespace squadtd {
  export enum WColNames {
    number = 'Number',
    name = 'Name',
    waveReward = 'Wave Prize',
    unitReward = 'Unit Prize',
    unitCount = 'Units',
    unitType = 'Defense Type',
    unitAttack = 'Attack Type',
    unitHP = 'Life',
    unitMove = 'Move Speed',
    unitRange = 'Range',
    unitAtkMin = 'Attack Min',
    unitAtkMax = 'Attack Max',
    unitAtkSpeed = 'Speed'
  }
  
  export class WaveImporter extends Importer {
    constructor(sheet:GoogleAppsScript.Spreadsheet.Sheet){
      super(sheet, WColNames);
    }

    public loadAllData():Array<Wave> {
      let waves:Array<Wave> = new Array<Wave>();
      for(let row:number = this.headerRow + 1; row < this.lastRow; row++){
        waves.push(this.loadDataAtRow(row))
      }
      return waves;
    }

    public loadDataAtRow(row: number):Wave {
      if(row <= this.headerRow) {
        return null;
      }
      
      this.setCurrentRow(row);
      let name:string   = this.getStringAt(WColNames.name);
      let number:number = this.getNumberAt(WColNames.number);
      let count:number  = this.getNumberAt(WColNames.unitCount);

      let unit:WaveUnit = new WaveUnit(name);
      unit.armorType    = this.getDataAt(WColNames.unitType) as UnitType;
      unit.attackSpeed  = this.getNumberAt(WColNames.unitAtkSpeed);
      unit.attackType   = this.getDataAt(WColNames.unitAttack) as DamageType;
      unit.hp           = this.getNumberAt(WColNames.unitHP);
      unit.maxAttack    = this.getNumberAt(WColNames.unitAtkMax);
      unit.minAttack    = this.getNumberAt(WColNames.unitAtkMin);
      unit.moveSpeed    = this.getNumberAt(WColNames.unitMove);
      unit.range        = this.getNumberAt(WColNames.unitRange);
      unit.reward       = this.getNumberAt(WColNames.unitReward);
      unit.wave         = number;

      let wave:Wave     = new Wave(number, unit, count)
      return wave;
    }
  }
}