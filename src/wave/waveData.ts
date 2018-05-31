/// <reference path="waveImporter.ts"/>
namespace squadtd {
  export namespace WaveData {
    let waves:Array<Wave>;
    let importer:Importer;

    export function Init(){
      if(!SpreadsheetApp)
        throw 'SpreadsheetApp variable not existant';

      let importSheet:GoogleAppsScript.Spreadsheet.Sheet = SpreadsheetApp.getActive().getSheetByName('Waves');
      
      if(!importSheet)
        throw Utilities.formatString('Cannot find spreadsheet named Waves to import');
      
      importer = new WaveImporter(importSheet);
      importer.loadAllData();
    }
  }
}