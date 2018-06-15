import { PlayerUnit } from "./playerUnit";
import { Importer } from "../data/importer";
import { UnitImporter } from "../data/unitImporter";

export namespace UnitData {
  let units: Array<PlayerUnit>;
  const spreadsheetName: string = "Units";
  let importer: Importer;

  export function Init() {
    if (!SpreadsheetApp) throw "SpreadsheetApp variable not existant";

    let importSheet: GoogleAppsScript.Spreadsheet.Sheet = SpreadsheetApp.getActive().getSheetByName(
      spreadsheetName
    );

    if (!importSheet) {
      Logger.log(
        Utilities.formatString("Cannot find spreadsheet named Waves to import")
      );
      return;
    }

    importer = new UnitImporter(importSheet);
    units = importer.loadAllData();
  }

  export function GetUnits() {
    return units;
  }
}
