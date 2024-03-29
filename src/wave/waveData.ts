/// <reference path="../data/waveImporter.ts"/>
/// <reference path="wave.ts"/>

namespace squadtd {
  export namespace WaveData {
    let waves: Array<Wave>;
    const spreadsheetName: string = "Waves";
    let importer: Importer;

    export function Init() {
      if (!SpreadsheetApp) throw "SpreadsheetApp variable not existant";

      let importSheet: GoogleAppsScript.Spreadsheet.Sheet = SpreadsheetApp.getActive().getSheetByName(
        spreadsheetName
      );

      if (!importSheet) {
        Logger.log(
          Utilities.formatString(
            "Cannot find spreadsheet named Waves to import"
          )
        );
        return;
      }

      importer = new WaveImporter(importSheet);
      waves = importer.loadAllData();
    }

    export function GetWaves() {
      return waves;
    }
  }
}
