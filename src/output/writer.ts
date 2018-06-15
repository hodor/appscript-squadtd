import { PlayerUnit } from "../unit/playerUnit";
import { OutputData } from "./outputData";

export class Writer {
  public static units: Array<PlayerUnit>;
  private static readonly spreadsheetName: string = "Output";
  public static outData: OutputData;

  public static Init() {
    if (!SpreadsheetApp) throw "SpreadsheetApp variable not existant";

    let outputSheet: GoogleAppsScript.Spreadsheet.Sheet = SpreadsheetApp.getActive().getSheetByName(
      Writer.spreadsheetName
    );

    if (!outputSheet) {
      Logger.log(
        Utilities.formatString(
          "Cannot find spreadsheet named Output to write down the data"
        )
      );
      return;
    }

    Writer.outData = new OutputData(outputSheet);
  }
}
