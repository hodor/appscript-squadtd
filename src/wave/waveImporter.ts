/// <reference path="../data/importer.ts"/>
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
      
      let curRow:Object[] = this.ValueData[row];

      let name:string = curRow[this.getCol(WColNames.name)] as string;
      let number:number = curRow[this.getCol(WColNames.number)] as number;
      let count:number = curRow[this.getCol(WColNames.unitCount)] as number;

      let unit:WaveUnit = new WaveUnit(name);
      unit.armorType = curRow[this.getCol(WColNames.unitType)] as UnitType;
      unit.attackSpeed = curRow[this.getCol(WColNames.unitAtkSpeed)] as number;
      unit.attackType = curRow[this.getCol(WColNames.unitAttack)] as DamageType;
      unit.hp = curRow[this.getCol(WColNames.unitHP)] as number;
      unit.maxAttack = curRow[this.getCol(WColNames.unitAtkMax)] as number;
      unit.minAttack = curRow[this.getCol(WColNames.unitAtkMin)] as number;
      unit.moveSpeed = curRow[this.getCol(WColNames.unitMove)] as number;
      unit.range = curRow[this.getCol(WColNames.unitRange)] as number;
      unit.reward = curRow[this.getCol(WColNames.unitReward)] as number;
      unit.wave = number;

      let wave:Wave = new Wave(number, unit, count)
      return wave;
    }
  }
}