export class InHeaderData {
  public name: string;
  public type: string;
  constructor(name: string, type: string) {
    this.name = name;
    this.type = type;
  }
}
export abstract class Importer {
  protected maxRowDepth = 200;
  protected maxColDepth = this.maxRowDepth;
  protected RangeData: GoogleAppsScript.Spreadsheet.Range;
  protected ValueData: Object[][];

  protected headerRow: number = -1;
  protected headerColDict = {};
  protected lastRow: number = 1;
  /**
   * Creates an instance of Importer.
   * @param {GoogleAppsScript.Spreadsheet.Sheet} sheet
   * @param {*} stringValues An Enum with string values
   * @param {*} typeDictionary An object that says the type for each of the enum values
   * @memberof Importer
   */
  constructor(
    sheet: GoogleAppsScript.Spreadsheet.Sheet,
    stringValues: any,
    startCol?: number,
    startRow?: number,
    numCols?: number,
    numRows?: number
  ) {
    let cStart = startCol || 1;
    let rStart = startRow || 1;
    let colCount = numCols || this.maxColDepth;
    let rowCount = numRows || this.maxRowDepth;
    this.RangeData = sheet.getRange(cStart, rStart, colCount, rowCount);
    this.ValueData = this.RangeData.getValues();

    // Find all the header keys
    for (let key in stringValues) {
      let name = stringValues[key];

      loopY: for (let y = 0; y < this.ValueData.length; y++) {
        for (let x = 0; x < this.ValueData[y].length; x++) {
          let val: any = this.ValueData[y][x];
          if (typeof val === "string") {
            if (val.toUpperCase() === name.toUpperCase()) {
              this.headerColDict[name] = x;

              if (this.headerRow == -1) {
                this.headerRow = y;
              }

              if (y != this.headerRow) {
                throw "Found header in different rows!";
              }

              break loopY;
            }
          }
        }
      }
    }

    // Then find the last row - the first one that is empty:
    for (let y = this.headerRow + 1; y < rowCount + this.headerRow; y++) {
      let val: string = this.ValueData[y][0] as string;
      if (val == "" || val == null || val == undefined) {
        this.lastRow = y;
        break;
      }
    }
  }

  public getCol(name: string) {
    return this.headerColDict[name];
  }

  private currentRowNum = -1;
  private currentRowData: Object[] = null;
  public setCurrentRow(row: number) {
    this.currentRowNum = row;
    this.currentRowData = this.ValueData[row];
  }
  public getStringAt(colName: string, rowNum?: number): string {
    if (rowNum !== undefined) this.setCurrentRow(rowNum);

    if (!this.currentRowData)
      throw Utilities.formatString(
        "Could not load column[%s] in row[%s]",
        colName,
        rowNum
      );

    return this.currentRowData[this.getCol(colName)] as string;
  }

  public getNumberAt(colName: string, rowNum?: number): number {
    if (rowNum !== undefined) this.setCurrentRow(rowNum);

    if (!this.currentRowData)
      throw Utilities.formatString(
        "Could not load column[%s] in row[%s]",
        colName,
        rowNum
      );

    return this.currentRowData[this.getCol(colName)] as number;
  }

  public getDataAt(colName: string, rowNum?: number): any {
    if (rowNum !== undefined) this.setCurrentRow(rowNum);

    if (!this.currentRowData)
      throw Utilities.formatString(
        "Could not load column[%s] in row[%s]",
        colName,
        rowNum
      );

    return this.currentRowData[this.getCol(colName)] as any;
  }

  public abstract loadAllData(): any;
  public abstract loadDataAtRow(row: number): any;
}
