/// <reference path="../data/importer.ts"/>
/// <reference path="../unit/playerUnit.ts"/>
namespace squadtd {
  export enum UColNames {
    name = 'Name',
    baseUnit = 'Base Unit',
    cost = 'Cost / Upgrade',
    supply = 'Supply',
    type = 'Defense Type',
    attack = 'Attack Type',
    hp = 'Life',
    mp = 'Energy',
    moveSpeed = 'Move Speed',
    range = 'Range',
    atkMin = 'Attack Min',
    atkMax = 'Attack Max',
    speed = 'Speed'
  }

  export class UnitImporter extends Importer {
    // We need to keep track of created units to handle base units of upgraded units.
    private loadedUnits:Array<PlayerUnit>;

    constructor(sheet:GoogleAppsScript.Spreadsheet.Sheet){
      super(sheet, UColNames);
    }

    public loadAllData() {
      this.loadedUnits = new Array<PlayerUnit>();
      for(let row:number = this.headerRow + 1; row < this.lastRow; row++){
        this.loadedUnits.push(this.loadDataAtRow(row))
      }
      return this.loadedUnits;
    }


    public loadDataAtRow(row: number) {
      if(row <= this.headerRow) {
        return null;
      }
      
      this.setCurrentRow(row);
      let name:string         = this.getStringAt(UColNames.name)      
      let baseUnitName:string = this.getStringAt(UColNames.baseUnit);
      let baseUnit:PlayerUnit = null;

      // If there's a base unit, make sure it was defined before in the spreadsheet
      if(baseUnitName){
        for(let i in this.loadedUnits){
          var cUnit:PlayerUnit = this.loadedUnits[i];
          if(cUnit.name.toUpperCase() === baseUnitName.toUpperCase()){
            baseUnit = cUnit;
            break;
          }
        }
      }

      if(baseUnitName && !baseUnit) throw Utilities.formatString('Unit %s on row %d has the undefined base unit %s. Try moving the %s above the unit %s', 
        name, row, baseUnitName, baseUnitName, name);

      let cost:number       = this.getNumberAt(UColNames.cost);
      let supply:number     = this.getNumberAt(UColNames.supply);
      let type:UnitType     = this.getDataAt(UColNames.type) as UnitType;
      let attack:DamageType = this.getDataAt(UColNames.attack) as DamageType;
      let hp:number         = this.getNumberAt(UColNames.hp);
      let mp:number         = this.getNumberAt(UColNames.mp);
      let moveSpeed:number  = this.getNumberAt(UColNames.moveSpeed);
      let range:number      = this.getNumberAt(UColNames.range);
      let atkMin:number     = this.getNumberAt(UColNames.atkMin);
      let atkMax:number     = this.getNumberAt(UColNames.atkMax);
      let speed:number      = this.getNumberAt(UColNames.speed);

      // TODO: Go back and add upgrades!
      let rowUnit:PlayerUnit = new PlayerUnit(name, cost, baseUnit, null, hp, mp, type,attack, atkMin, atkMax, speed, moveSpeed, range);
      Logger.log(Utilities.formatString('Creating unit[%s], which has a base type %s. Armor[%s], Weapon[%s], DPS[%f]', rowUnit.name, baseUnitName, rowUnit.armorType, rowUnit.attackType, rowUnit.DPS()));
      this.loadedUnits.push(rowUnit);
      return rowUnit;
    }
  }
}