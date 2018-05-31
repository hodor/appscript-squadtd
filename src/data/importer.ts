namespace squadtd {
  export abstract class Importer {
    protected maxRowDepth = 200;
    protected maxColDepth = this.maxRowDepth;
    protected RangeData:GoogleAppsScript.Spreadsheet.Range;
    protected ValueData:Object[][];

    protected headerRow:number = -1;
    protected headerColDict = {};
    protected lastRow:number = 1;

    /**
     * Creates an instance of Importer.
     * @param {GoogleAppsScript.Spreadsheet.Sheet} sheet 
     * @param {*} stringValues An Enum with string values
     * @memberof Importer
     */
    constructor(sheet: GoogleAppsScript.Spreadsheet.Sheet, stringValues: any, startCol?:number, startRow?:number, numCols?:number, numRows?:number) {
      let cStart = startCol || 1;
      let rStart = startRow || 1;
      let colCount = numCols || this.maxColDepth;
      let rowCount = numRows || this.maxRowDepth;
      this.RangeData = sheet.getRange(cStart, rStart, colCount, rowCount);
      this.ValueData = this.RangeData.getValues();

      // Find all the header keys
      for (let key in stringValues) {
        let name = stringValues[key];

        loopY:
        for (let y = 0; y < this.ValueData.length; y++) {
          for (let x = 0; x < this.ValueData[y].length; x++) {
            let val: any = this.ValueData[y][x];
            if (typeof val === 'string') {
              if (val.toUpperCase() === name.toUpperCase()) {
                this.headerColDict[name] = x;

                if(this.headerRow == -1){
                  this.headerRow = y;
                }

                if(y != this.headerRow){
                  throw 'Found header in different rows!';
                }

                break loopY;
              }
            }
          }
        }
      }

      // Then find the last row - the first one that is empty:
      for(let y = this.headerRow + 1; y < rowCount + this.headerRow; y++) {
        let val:string = this.ValueData[y][0] as string;
        if(val == '' || val == null || val == undefined)
        {
          this.lastRow = y;
          break;
        }
      }
    }

    public getCol(name:string){
      return this.headerColDict[name];
    }
    public abstract loadAllData(): any;
    public abstract loadDataAtRow(row:number): any; 
  }
}