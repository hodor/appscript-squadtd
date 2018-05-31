/// <reference path="../data/unitImporter.ts"/>
namespace squadtd {
  export namespace UnitData {
    let units:Array<PlayerUnit>;
    let importer:Importer;

    export function Init(){
      if(!SpreadsheetApp)
        throw 'SpreadsheetApp variable not existant';

      let importSheet:GoogleAppsScript.Spreadsheet.Sheet = SpreadsheetApp.getActive().getSheetByName('Units');
      
      if(!importSheet){
        Logger.log(Utilities.formatString('Cannot find spreadsheet named Waves to import'));
        return;
      }

      importer = new UnitImporter(importSheet);
      units = importer.loadAllData();
    }
  }
}