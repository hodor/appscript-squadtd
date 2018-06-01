namespace squadtd {
  export class OutHeaderData {
    public col: number = 1;
    public row: number = 1;
    public name: string = '';
    constructor(name: string, row:number, col:number) {
      this.name = name;
      this.col = col;
      this.row = row;
    }
  }

  export enum OutputHeader {
    waveNumber = 'Wave Number',
    waveUnitCount = 'Wave Size',
    waveUnit = 'Wave Unit',
  }

  export class OutputData {
    protected sheet: GoogleAppsScript.Spreadsheet.Sheet;

    // Imported data
    protected waves: Array<Wave>;
    protected units: Array<PlayerUnit>;

    // To know where to put what
    protected outDataDict = {}

    // All the solvers that we're going to use
    protected solvers: Array<Solver>;

    constructor(sheet: GoogleAppsScript.Spreadsheet.Sheet) {
      this.sheet = sheet;
      this.waves = WaveData.GetWaves();
      this.units = UnitData.GetUnits();

      let col = 1;
      for (let key in OutputHeader) {
        this.outDataDict[OutputHeader[key]] = new OutHeaderData(OutputHeader[key], 1, col);
        col++;
      }

      // Put all the solvers we want to test:
      this.solvers = new Array<Solver>();
      this.solvers.push(new GreedyAttackDamageSolver(this.waves, this.units));

      this.writeData();
    }

    protected getHeaderCol(header: string): number {
      let data: OutHeaderData = this.outDataDict[header];
      return data.col;
    }

    public writeData() {
      this.writeHeader(1);
      this.writeWaves(2);
    }

    public writeHeader(row: number) {
      let col = 0;
      for (let key in OutputHeader) {
        let data: OutHeaderData = this.outDataDict[OutputHeader[key]]
        this.sheet.getRange(row, data.col).setValue(data.name);
        col = data.col;
      }

      // Populate the header with all the solvers
      for (let i in this.solvers) {
        col++;
        this.sheet.getRange(row, col).setValue(this.solvers[i].getName());
        //TODO: Handle solvers with sub-names (that returns more than one data)
      }
    }

    public writeWaves(startRow: number) {
      for (let i = 0; i < this.waves.length; i++) {
        this.writeWave(this.waves[i], startRow + i);
      }
    }

    public writeWave(wave: Wave, row: number) {
      this.sheet.getRange(row, this.getHeaderCol(OutputHeader.waveNumber)).setValue(wave.number);
      this.sheet.getRange(row, this.getHeaderCol(OutputHeader.waveUnitCount)).setValue(wave.unitCount);
      this.sheet.getRange(row, this.getHeaderCol(OutputHeader.waveUnit)).setValue(wave.unit.name + 's');

      let lastCol = this.getHeaderCol(OutputHeader.waveUnit) + 1;
      // Now add the unit for each solver.
      for (let i in this.solvers) {
        let solver: Solver = this.solvers[i];
        let units:PlayerUnit[] = solver.solveWave(wave.number);

        // Put all the units in a single column
        let retString:string = '';
        for(let j:number=0; j < units.length; j++) {
          retString += units[i].name;
          if((j + 1) < units.length){
            retString += ', '
          }
        }
        this.sheet.getRange(row, lastCol).setValue(retString);
      }
    }
  }
}