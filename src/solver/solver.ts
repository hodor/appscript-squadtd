namespace squadtd {
  export abstract class Solver {
    protected waves: Array<Wave>;
    protected units: Array<PlayerUnit>
    constructor(waves: Array<Wave>, units: Array<PlayerUnit>) {
      this.waves = waves;
      this.units = units;
    }

    /**
     * The number of columns that this solver uses
     * 
     * @returns {number} 
     * @memberof Solver
     */
    public getColumns(): number { return 1; }

    /**
     * Get all the subnames, in case this solver returns more than on data
     * 
     * @abstract
     * @returns {string[]} 
     * @memberof Solver
     */
    public abstract getNames(): string[];

    /**
     * The name of this solver
     * 
     * @abstract
     * @returns {string} 
     * @memberof Solver
     */
    public abstract getName(): string;

    /**
     * Solves this wave for a list of units, using a specific algorithm.
     * 
     * @abstract
     * @param {number} number 
     * @returns {PlayerUnit} 
     * @memberof Solver
     */
    public abstract solveWave(number: number): PlayerUnit[];
  }
}