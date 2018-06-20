namespace squadtd {
  export namespace Writer {
    let units: Array<PlayerUnit>;
    const spreadsheetName: string = "Output";
    let outData: OutputData;

    export function Init() {
      if (!SpreadsheetApp) throw "SpreadsheetApp variable not existant";

      let outputSheet: GoogleAppsScript.Spreadsheet.Sheet = SpreadsheetApp.getActive().getSheetByName(
        spreadsheetName
      );

      if (!outputSheet) {
        Logger.log(
          Utilities.formatString(
            "Cannot find spreadsheet named Output to write down the data"
          )
        );
        return;
      }

      outData = new OutputData(outputSheet);
    }
  }
}
