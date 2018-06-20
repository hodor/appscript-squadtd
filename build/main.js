"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var squadtd;
(function (squadtd) {
    var DamageType;
    (function (DamageType) {
        DamageType["normal"] = "NORMAL";
        DamageType["piercing"] = "PIERCING";
        DamageType["magic"] = "MAGIC";
        DamageType["siege"] = "SIEGE";
        DamageType["chaos"] = "CHAOS";
    })(DamageType = squadtd.DamageType || (squadtd.DamageType = {}));
})(squadtd || (squadtd = {}));
var squadtd;
(function (squadtd) {
    var UnitType;
    (function (UnitType) {
        UnitType["armored"] = "ARMORED";
        UnitType["light"] = "LIGHT";
        UnitType["massive"] = "MASSIVE";
        UnitType["mechanical"] = "MECHANICAL";
        UnitType["biological"] = "BIOLOGICAL";
    })(UnitType = squadtd.UnitType || (squadtd.UnitType = {}));
})(squadtd || (squadtd = {}));
var squadtd;
(function (squadtd) {
    var Calculator = (function () {
        function Calculator() {
        }
        Calculator.isUnitTypeValid = function (unit) {
            for (var key in squadtd.UnitType) {
                var value = squadtd.UnitType[key];
                if (value.toUpperCase() === unit.toUpperCase())
                    return true;
            }
            return false;
        };
        Calculator.isDamageTypeValid = function (damage) {
            for (var key in squadtd.DamageType) {
                var value = squadtd.DamageType[key];
                if (value.toUpperCase() === damage.toUpperCase())
                    return true;
            }
            return false;
        };
        Calculator.baseDamage = function (damage, unit) {
            if (!this.isDamageTypeValid(damage))
                throw Utilities.formatString('Invalid damage type: %s', damage);
            if (!this.isUnitTypeValid(unit))
                throw Utilities.formatString('Invalid unit type %s', unit);
            damage = damage.toUpperCase();
            unit = unit.toUpperCase();
            if (damage == squadtd.DamageType.chaos || unit == squadtd.UnitType.biological)
                return 1;
            switch (damage) {
                case squadtd.DamageType.normal:
                    switch (unit) {
                        case squadtd.UnitType.armored:
                            return 1.2;
                        case squadtd.UnitType.light:
                            return .9;
                        case squadtd.UnitType.massive:
                            return .9;
                        case squadtd.UnitType.mechanical:
                            return .8;
                    }
                case squadtd.DamageType.magic:
                    switch (unit) {
                        case squadtd.UnitType.armored:
                            return .8;
                        case squadtd.UnitType.light:
                            return 1.1;
                        case squadtd.UnitType.massive:
                            return 1.2;
                        case squadtd.UnitType.mechanical:
                            return .7;
                    }
                case squadtd.DamageType.piercing:
                    switch (unit) {
                        case squadtd.UnitType.armored:
                            return .8;
                        case squadtd.UnitType.light:
                            return 1.3;
                        case squadtd.UnitType.massive:
                            return .9;
                        case squadtd.UnitType.mechanical:
                            return .7;
                    }
                case squadtd.DamageType.siege:
                    switch (unit) {
                        case squadtd.UnitType.armored:
                            return .9;
                        case squadtd.UnitType.light:
                            return .9;
                        case squadtd.UnitType.massive:
                            return .9;
                        case squadtd.UnitType.mechanical:
                            return 1.25;
                    }
            }
            throw Utilities.formatString('Could not find any relationship between damage type %s and unit type %s', damage, unit);
        };
        Calculator.DPS = function (damageMin, damageMax, speed) {
            return ((damageMin + damageMax) / 2) / speed;
        };
        Calculator.DPSCostBenefit = function (cost, supply, dps) {
            return (dps * dps) / cost;
        };
        return Calculator;
    }());
    squadtd.Calculator = Calculator;
})(squadtd || (squadtd = {}));
var squadtd;
(function (squadtd) {
    var InHeaderData = (function () {
        function InHeaderData(name, type) {
            this.name = name;
            this.type = type;
        }
        return InHeaderData;
    }());
    squadtd.InHeaderData = InHeaderData;
    var Importer = (function () {
        function Importer(sheet, stringValues, startCol, startRow, numCols, numRows) {
            this.maxRowDepth = 200;
            this.maxColDepth = this.maxRowDepth;
            this.headerRow = -1;
            this.headerColDict = {};
            this.lastRow = 1;
            this.currentRowNum = -1;
            this.currentRowData = null;
            var cStart = startCol || 1;
            var rStart = startRow || 1;
            var colCount = numCols || this.maxColDepth;
            var rowCount = numRows || this.maxRowDepth;
            this.RangeData = sheet.getRange(cStart, rStart, colCount, rowCount);
            this.ValueData = this.RangeData.getValues();
            for (var key in stringValues) {
                var name = stringValues[key];
                loopY: for (var y = 0; y < this.ValueData.length; y++) {
                    for (var x = 0; x < this.ValueData[y].length; x++) {
                        var val = this.ValueData[y][x];
                        if (typeof val === 'string') {
                            if (val.toUpperCase() === name.toUpperCase()) {
                                this.headerColDict[name] = x;
                                if (this.headerRow == -1) {
                                    this.headerRow = y;
                                }
                                if (y != this.headerRow) {
                                    throw 'Found header in different rows!';
                                }
                                break loopY;
                            }
                        }
                    }
                }
            }
            for (var y = this.headerRow + 1; y < rowCount + this.headerRow; y++) {
                var val = this.ValueData[y][0];
                if (val == '' || val == null || val == undefined) {
                    this.lastRow = y;
                    break;
                }
            }
        }
        Importer.prototype.getCol = function (name) {
            return this.headerColDict[name];
        };
        Importer.prototype.setCurrentRow = function (row) {
            this.currentRowNum = row;
            this.currentRowData = this.ValueData[row];
        };
        Importer.prototype.getStringAt = function (colName, rowNum) {
            if (rowNum !== undefined)
                this.setCurrentRow(rowNum);
            if (!this.currentRowData)
                throw Utilities.formatString('Could not load column[%s] in row[%s]', colName, rowNum);
            return this.currentRowData[this.getCol(colName)];
        };
        Importer.prototype.getNumberAt = function (colName, rowNum) {
            if (rowNum !== undefined)
                this.setCurrentRow(rowNum);
            if (!this.currentRowData)
                throw Utilities.formatString('Could not load column[%s] in row[%s]', colName, rowNum);
            return this.currentRowData[this.getCol(colName)];
        };
        Importer.prototype.getDataAt = function (colName, rowNum) {
            if (rowNum !== undefined)
                this.setCurrentRow(rowNum);
            if (!this.currentRowData)
                throw Utilities.formatString('Could not load column[%s] in row[%s]', colName, rowNum);
            return this.currentRowData[this.getCol(colName)];
        };
        return Importer;
    }());
    squadtd.Importer = Importer;
})(squadtd || (squadtd = {}));
var squadtd;
(function (squadtd) {
    var Effectiveness;
    (function (Effectiveness) {
        var effectiveDict = {};
        var initialized = false;
        function Init() {
            if (initialized)
                return;
            for (var uKey in squadtd.UnitType) {
                var armor = squadtd.UnitType[uKey];
                effectiveDict[armor] = {
                    damage: 0,
                    type: new Array()
                };
                var bestWeapon = 'null';
                var bestDamage = 0;
                for (var dKey in squadtd.DamageType) {
                    var weapon = squadtd.DamageType[dKey];
                    var damage = squadtd.Calculator.baseDamage(weapon, armor);
                    if (damage > bestDamage) {
                        bestWeapon = weapon;
                        bestDamage = damage;
                    }
                }
                effectiveDict[armor].damage = bestDamage;
                effectiveDict[armor].type.push(bestWeapon);
                weaponLoop: for (var dKey in squadtd.DamageType) {
                    var weapon = squadtd.DamageType[dKey];
                    for (var i in effectiveDict[armor].type) {
                        if (effectiveDict[armor].type[i] == weapon) {
                            continue weaponLoop;
                        }
                    }
                    var damage = squadtd.Calculator.baseDamage(weapon, armor);
                    if (damage == effectiveDict[armor].damage) {
                        effectiveDict[armor].type.push(weapon);
                    }
                }
            }
            initialized = true;
        }
        Effectiveness.Init = Init;
        function mostEffectiveAgainst(armor) {
            if (!initialized)
                Init();
            if (!squadtd.Calculator.isUnitTypeValid(armor))
                throw Utilities.formatString('Unit type %s is not valid', armor);
            return effectiveDict[squadtd.UnitType[armor.toLowerCase()]].type;
        }
        Effectiveness.mostEffectiveAgainst = mostEffectiveAgainst;
    })(Effectiveness = squadtd.Effectiveness || (squadtd.Effectiveness = {}));
})(squadtd || (squadtd = {}));
var squadtd;
(function (squadtd) {
    var Unit = (function () {
        function Unit(name, hp, armorType, attackType, minAttack, maxAttack, attackSpeed, moveSpeed, range) {
            this.hp = 0;
            this.name = name || '';
            this.hp = hp || 0;
            this.armorType = armorType || squadtd.UnitType.biological;
            this.attackType = attackType || squadtd.DamageType.chaos;
            this.minAttack = minAttack || 0;
            this.maxAttack = maxAttack || 0;
            this.attackSpeed = attackSpeed || 0;
            this.moveSpeed = moveSpeed || 0;
            this.range = range || 0;
        }
        Unit.prototype.DPS = function () {
            return squadtd.Calculator.DPS(this.minAttack, this.maxAttack, this.attackSpeed);
        };
        Unit.prototype.copyFrom = function (other) {
            this.name = other.name;
            this.hp = other.hp;
            this.armorType = other.armorType;
            this.attackType = other.attackType;
            this.minAttack = other.minAttack;
            this.maxAttack = other.maxAttack;
            this.attackSpeed = other.attackSpeed;
            this.moveSpeed = other.moveSpeed;
            this.range = other.range;
        };
        return Unit;
    }());
    squadtd.Unit = Unit;
})(squadtd || (squadtd = {}));
var squadtd;
(function (squadtd) {
    var WaveUnit = (function (_super) {
        __extends(WaveUnit, _super);
        function WaveUnit(name, wave, reward, hp, armorType, attackType, minAttack, maxAttack, attackSpeed, moveSpeed, range) {
            var _this = _super.call(this, name, hp, armorType, attackType, minAttack, maxAttack, attackSpeed, moveSpeed, range) || this;
            _this.wave = wave || 0;
            _this.reward = reward || 0;
            return _this;
        }
        WaveUnit.prototype.copyFrom = function (other) {
            _super.prototype.copyFrom.call(this, other);
            this.wave = other.wave;
            this.reward = other.reward;
        };
        return WaveUnit;
    }(squadtd.Unit));
    squadtd.WaveUnit = WaveUnit;
})(squadtd || (squadtd = {}));
var squadtd;
(function (squadtd) {
    var VeteranUnit = (function (_super) {
        __extends(VeteranUnit, _super);
        function VeteranUnit(name, wave, reward, life, armorType, attackType, minAttack, maxAttack, attackSpeed, moveSpeed, range) {
            var _this = _super.call(this, name, wave, reward, life, armorType, attackType, minAttack, maxAttack, attackSpeed, moveSpeed, range) || this;
            _this.setupVeteranData(_this.wave, _this.attackSpeed, _this.minAttack, _this.maxAttack, _this.hp);
            return _this;
        }
        VeteranUnit.GetDamage = function (damage, wave) {
            var bonus = wave * this.damagePerWave;
            return damage * (1 + bonus);
        };
        VeteranUnit.GetHP = function (hp, wave) {
            var bonus = wave * this.hpPerWave;
            var total = hp * (1 + bonus);
            if (wave <= 3)
                return Math.floor(total);
            return Math.ceil(total);
        };
        VeteranUnit.GetSpeed = function (speed, wave) {
            var bonus = wave * this.speedPerWave;
            var total = speed * (1 - bonus);
            return Number(total.toFixed(2));
        };
        VeteranUnit.prototype.setupVeteranData = function (wave, atkSpeed, min, max, life) {
            var vetSpeed = VeteranUnit.GetSpeed(atkSpeed, wave);
            var vetMinAtk = VeteranUnit.GetDamage(min, wave);
            var vetMaxAtk = VeteranUnit.GetDamage(max, wave);
            var vetHP = VeteranUnit.GetHP(life, wave);
            this.bonusMaxAttack = vetMaxAtk - this.maxAttack;
            this.bonusMinAttack = vetMinAtk - this.minAttack;
            this.bonusLife = vetHP - this.hp;
            this.bonusAttackSpeed = this.attackSpeed - vetSpeed;
            this.maxAttack = vetMaxAtk;
            this.minAttack = vetMinAtk;
            this.attackSpeed = vetSpeed;
            this.hp = vetHP;
        };
        VeteranUnit.prototype.copyFrom = function (other) {
            _super.prototype.copyFrom.call(this, other);
            this.setupVeteranData(other.wave, other.attackSpeed, other.minAttack, other.maxAttack, other.hp);
        };
        VeteranUnit.damagePerWave = .02;
        VeteranUnit.hpPerWave = .02;
        VeteranUnit.speedPerWave = .01;
        return VeteranUnit;
    }(squadtd.WaveUnit));
    squadtd.VeteranUnit = VeteranUnit;
})(squadtd || (squadtd = {}));
var squadtd;
(function (squadtd) {
    var Wave = (function () {
        function Wave(number, unit, unitCount) {
            this.number = number;
            this.unit = unit;
            this.unitCount = unitCount;
            this.vUnit = new squadtd.VeteranUnit();
            this.vUnit.copyFrom(unit);
            this.reward = Wave.GetWaveReward(number);
        }
        Wave.GetWaveReward = function (wave) {
            var reward = this.startWaveReward;
            if (wave == 1)
                return reward;
            for (var i = 1; i < wave + 1; i++) {
                if (i - 1 == 0)
                    continue;
                reward += (i - 1) % 3 == 0 ? 1 : 2;
            }
            return reward;
        };
        Wave.Terratron = function (wave) {
            var upgrade = wave - 30;
            if (upgrade <= 0)
                throw Utilities.formatString('Cannot create Terratron on wave %s. Minimum Wave is 31', wave);
            upgrade -= 1;
            var baseLife = 5804;
            var baseMinAtk = 248;
            var baseAtkDiff = 21;
            var hpPerUpgrade = 267;
            var atkPerUpgrade = 2.34;
            var life = baseLife + (hpPerUpgrade * upgrade);
            var atkMin = baseMinAtk + (Math.floor(atkPerUpgrade * upgrade));
            var atkMax = atkMin + baseAtkDiff;
            return new squadtd.WaveUnit("Terratron", wave, 0, life, squadtd.UnitType.biological, squadtd.DamageType.chaos, atkMin, atkMax, 1, 4, 2.25);
        };
        Wave.prototype.getMaximumReward = function () {
            return this.reward + (this.unit.reward * this.unitCount);
        };
        Wave.prototype.getTotalHP = function (isVet) {
            var unitHP = this.unit.hp;
            if (isVet)
                unitHP = this.vUnit.hp;
            return unitHP * this.unitCount;
        };
        Wave.startWaveReward = 13;
        return Wave;
    }());
    squadtd.Wave = Wave;
})(squadtd || (squadtd = {}));
var squadtd;
(function (squadtd) {
    var WColNames;
    (function (WColNames) {
        WColNames["number"] = "Number";
        WColNames["name"] = "Name";
        WColNames["waveReward"] = "Wave Prize";
        WColNames["unitReward"] = "Unit Prize";
        WColNames["unitCount"] = "Units";
        WColNames["unitType"] = "Defense Type";
        WColNames["unitAttack"] = "Attack Type";
        WColNames["unitHP"] = "Life";
        WColNames["unitMove"] = "Move Speed";
        WColNames["unitRange"] = "Range";
        WColNames["unitAtkMin"] = "Attack Min";
        WColNames["unitAtkMax"] = "Attack Max";
        WColNames["unitAtkSpeed"] = "Speed";
    })(WColNames = squadtd.WColNames || (squadtd.WColNames = {}));
    var WaveImporter = (function (_super) {
        __extends(WaveImporter, _super);
        function WaveImporter(sheet) {
            return _super.call(this, sheet, WColNames) || this;
        }
        WaveImporter.prototype.loadAllData = function () {
            var waves = new Array();
            for (var row = this.headerRow + 1; row < this.lastRow; row++) {
                waves.push(this.loadDataAtRow(row));
            }
            return waves;
        };
        WaveImporter.prototype.loadDataAtRow = function (row) {
            if (row <= this.headerRow) {
                return null;
            }
            this.setCurrentRow(row);
            var name = this.getStringAt(WColNames.name);
            var number = this.getNumberAt(WColNames.number);
            var count = this.getNumberAt(WColNames.unitCount);
            var unit = new squadtd.WaveUnit(name);
            unit.armorType = this.getDataAt(WColNames.unitType);
            unit.attackSpeed = this.getNumberAt(WColNames.unitAtkSpeed);
            unit.attackType = this.getDataAt(WColNames.unitAttack);
            unit.hp = this.getNumberAt(WColNames.unitHP);
            unit.maxAttack = this.getNumberAt(WColNames.unitAtkMax);
            unit.minAttack = this.getNumberAt(WColNames.unitAtkMin);
            unit.moveSpeed = this.getNumberAt(WColNames.unitMove);
            unit.range = this.getNumberAt(WColNames.unitRange);
            unit.reward = this.getNumberAt(WColNames.unitReward);
            unit.wave = number;
            var wave = new squadtd.Wave(number, unit, count);
            return wave;
        };
        return WaveImporter;
    }(squadtd.Importer));
    squadtd.WaveImporter = WaveImporter;
})(squadtd || (squadtd = {}));
var squadtd;
(function (squadtd) {
    var WaveData;
    (function (WaveData) {
        var waves;
        var spreadsheetName = 'Waves';
        var importer;
        function Init() {
            if (!SpreadsheetApp)
                throw 'SpreadsheetApp variable not existant';
            var importSheet = SpreadsheetApp.getActive().getSheetByName(spreadsheetName);
            if (!importSheet) {
                Logger.log(Utilities.formatString('Cannot find spreadsheet named Waves to import'));
                return;
            }
            importer = new squadtd.WaveImporter(importSheet);
            waves = importer.loadAllData();
        }
        WaveData.Init = Init;
        function GetWaves() {
            return waves;
        }
        WaveData.GetWaves = GetWaves;
    })(WaveData = squadtd.WaveData || (squadtd.WaveData = {}));
})(squadtd || (squadtd = {}));
var squadtd;
(function (squadtd) {
    var PlayerUnit = (function (_super) {
        __extends(PlayerUnit, _super);
        function PlayerUnit(name, cost, baseUnit, upgradesTo, hp, energy, armorType, attackType, minAtk, maxAtk, atkSpeed, moveSpeed, range) {
            var _this = _super.call(this, name, hp, armorType, attackType, minAtk, maxAtk, atkSpeed, moveSpeed, range) || this;
            _this.baseUnit = baseUnit || null;
            _this.upgradeUnits = upgradesTo || new Array();
            _this.cost = cost || 0;
            _this.energy = energy || 0;
            return _this;
        }
        PlayerUnit.prototype.getCost = function () {
            var totalCost = this.cost;
            if (this.baseUnit)
                totalCost += this.baseUnit.getCost();
            return totalCost;
        };
        return PlayerUnit;
    }(squadtd.Unit));
    squadtd.PlayerUnit = PlayerUnit;
})(squadtd || (squadtd = {}));
var squadtd;
(function (squadtd) {
    var UColNames;
    (function (UColNames) {
        UColNames["name"] = "Name";
        UColNames["baseUnit"] = "Base Unit";
        UColNames["cost"] = "Cost / Upgrade";
        UColNames["supply"] = "Supply";
        UColNames["type"] = "Defense Type";
        UColNames["attack"] = "Attack Type";
        UColNames["hp"] = "Life";
        UColNames["mp"] = "Energy";
        UColNames["moveSpeed"] = "Move Speed";
        UColNames["range"] = "Range";
        UColNames["atkMin"] = "Attack Min";
        UColNames["atkMax"] = "Attack Max";
        UColNames["speed"] = "Speed";
    })(UColNames = squadtd.UColNames || (squadtd.UColNames = {}));
    var UnitImporter = (function (_super) {
        __extends(UnitImporter, _super);
        function UnitImporter(sheet) {
            return _super.call(this, sheet, UColNames) || this;
        }
        UnitImporter.prototype.loadAllData = function () {
            this.loadedUnits = new Array();
            for (var row = this.headerRow + 1; row < this.lastRow; row++) {
                this.loadedUnits.push(this.loadDataAtRow(row));
            }
            return this.loadedUnits;
        };
        UnitImporter.prototype.loadDataAtRow = function (row) {
            if (row <= this.headerRow) {
                return null;
            }
            this.setCurrentRow(row);
            var name = this.getStringAt(UColNames.name);
            var baseUnitName = this.getStringAt(UColNames.baseUnit);
            var baseUnit = null;
            if (baseUnitName) {
                for (var i in this.loadedUnits) {
                    var cUnit = this.loadedUnits[i];
                    if (cUnit.name.toUpperCase() === baseUnitName.toUpperCase()) {
                        baseUnit = cUnit;
                        break;
                    }
                }
            }
            if (baseUnitName && !baseUnit)
                throw Utilities.formatString('Unit %s on row %d has the undefined base unit %s. Try moving the %s above the unit %s', name, row, baseUnitName, baseUnitName, name);
            var cost = this.getNumberAt(UColNames.cost);
            var supply = this.getNumberAt(UColNames.supply);
            var type = this.getDataAt(UColNames.type);
            var attack = this.getDataAt(UColNames.attack);
            var hp = this.getNumberAt(UColNames.hp);
            var mp = this.getNumberAt(UColNames.mp);
            var moveSpeed = this.getNumberAt(UColNames.moveSpeed);
            var range = this.getNumberAt(UColNames.range);
            var atkMin = this.getNumberAt(UColNames.atkMin);
            var atkMax = this.getNumberAt(UColNames.atkMax);
            var speed = this.getNumberAt(UColNames.speed);
            var rowUnit = new squadtd.PlayerUnit(name, cost, baseUnit, null, hp, mp, type, attack, atkMin, atkMax, speed, moveSpeed, range);
            Logger.log(Utilities.formatString('Creating unit[%s], which has a base type %s. Armor[%s], Weapon[%s], DPS[%f]', rowUnit.name, baseUnitName, rowUnit.armorType, rowUnit.attackType, rowUnit.DPS()));
            this.loadedUnits.push(rowUnit);
            return rowUnit;
        };
        return UnitImporter;
    }(squadtd.Importer));
    squadtd.UnitImporter = UnitImporter;
})(squadtd || (squadtd = {}));
var squadtd;
(function (squadtd) {
    var UnitData;
    (function (UnitData) {
        var units;
        var spreadsheetName = 'Units';
        var importer;
        function Init() {
            if (!SpreadsheetApp)
                throw 'SpreadsheetApp variable not existant';
            var importSheet = SpreadsheetApp.getActive().getSheetByName(spreadsheetName);
            if (!importSheet) {
                Logger.log(Utilities.formatString('Cannot find spreadsheet named Waves to import'));
                return;
            }
            importer = new squadtd.UnitImporter(importSheet);
            units = importer.loadAllData();
        }
        UnitData.Init = Init;
        function GetUnits() {
            return units;
        }
        UnitData.GetUnits = GetUnits;
    })(UnitData = squadtd.UnitData || (squadtd.UnitData = {}));
})(squadtd || (squadtd = {}));
var squadtd;
(function (squadtd) {
    var Writer;
    (function (Writer) {
        var units;
        var spreadsheetName = 'Output';
        var outData;
        function Init() {
            if (!SpreadsheetApp)
                throw 'SpreadsheetApp variable not existant';
            var outputSheet = SpreadsheetApp.getActive().getSheetByName(spreadsheetName);
            if (!outputSheet) {
                Logger.log(Utilities.formatString('Cannot find spreadsheet named Output to write down the data'));
                return;
            }
            outData = new squadtd.OutputData(outputSheet);
        }
        Writer.Init = Init;
    })(Writer = squadtd.Writer || (squadtd.Writer = {}));
})(squadtd || (squadtd = {}));
var squadtd;
(function (squadtd) {
    var Solver = (function () {
        function Solver(waves, units) {
            this.waves = waves;
            this.units = units;
        }
        Solver.prototype.getColumns = function () { return 1; };
        return Solver;
    }());
    squadtd.Solver = Solver;
})(squadtd || (squadtd = {}));
var squadtd;
(function (squadtd) {
    var GreedyAttackSolver = (function (_super) {
        __extends(GreedyAttackSolver, _super);
        function GreedyAttackSolver() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        GreedyAttackSolver.prototype.getNames = function () {
            throw new Error("Method not implemented.");
        };
        GreedyAttackSolver.prototype.getName = function () {
            return 'Greedy Attack Algorithm';
        };
        GreedyAttackSolver.prototype.solveWave = function (number) {
            var attacker = this.waves[number - 1].vUnit;
            var bestDps = 0;
            var bestUnit;
            for (var i = 0; i < this.units.length; i++) {
                var unit = this.units[i];
                var dps = unit.DPS() * squadtd.Calculator.baseDamage(unit.attackType, attacker.armorType);
                if (dps > bestDps) {
                    bestDps = dps;
                    bestUnit = unit;
                }
            }
            return [bestUnit];
        };
        return GreedyAttackSolver;
    }(squadtd.Solver));
    squadtd.GreedyAttackSolver = GreedyAttackSolver;
})(squadtd || (squadtd = {}));
var squadtd;
(function (squadtd) {
    var GreedyDefenseSolver = (function (_super) {
        __extends(GreedyDefenseSolver, _super);
        function GreedyDefenseSolver() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        GreedyDefenseSolver.prototype.getNames = function () {
            throw new Error("Method not implemented.");
        };
        GreedyDefenseSolver.prototype.getName = function () {
            return 'Greedy Defense Algorithm';
        };
        GreedyDefenseSolver.prototype.solveWave = function (number) {
            var attacker = this.waves[number - 1].vUnit;
            var bestSecondsToDie = 0;
            var bestUnit;
            for (var i = 0; i < this.units.length; i++) {
                var unit = this.units[i];
                var secondsToDie = unit.hp / (attacker.DPS() * squadtd.Calculator.baseDamage(attacker.attackType, unit.armorType));
                if (secondsToDie > bestSecondsToDie) {
                    bestSecondsToDie = secondsToDie;
                    bestUnit = unit;
                }
            }
            return [bestUnit];
        };
        return GreedyDefenseSolver;
    }(squadtd.Solver));
    squadtd.GreedyDefenseSolver = GreedyDefenseSolver;
})(squadtd || (squadtd = {}));
var squadtd;
(function (squadtd) {
    var OutHeaderData = (function () {
        function OutHeaderData(name, row, col) {
            this.col = 1;
            this.row = 1;
            this.name = '';
            this.name = name;
            this.col = col;
            this.row = row;
        }
        return OutHeaderData;
    }());
    squadtd.OutHeaderData = OutHeaderData;
    var OutputHeader;
    (function (OutputHeader) {
        OutputHeader["waveNumber"] = "Wave Number";
        OutputHeader["waveUnitCount"] = "Wave Size";
        OutputHeader["waveUnit"] = "Wave Unit";
    })(OutputHeader = squadtd.OutputHeader || (squadtd.OutputHeader = {}));
    var OutputData = (function () {
        function OutputData(sheet) {
            this.outDataDict = {};
            this.sheet = sheet;
            this.waves = squadtd.WaveData.GetWaves();
            this.units = squadtd.UnitData.GetUnits();
            var col = 1;
            for (var key in OutputHeader) {
                this.outDataDict[OutputHeader[key]] = new OutHeaderData(OutputHeader[key], 1, col);
                col++;
            }
            this.solvers = new Array();
            this.solvers.push(new squadtd.GreedyAttackSolver(this.waves, this.units));
            this.solvers.push(new squadtd.GreedyDefenseSolver(this.waves, this.units));
            this.writeData();
        }
        OutputData.prototype.getHeaderCol = function (header) {
            var data = this.outDataDict[header];
            return data.col;
        };
        OutputData.prototype.writeData = function () {
            this.writeHeader(1);
            this.writeWaves(2);
        };
        OutputData.prototype.writeHeader = function (row) {
            var col = 0;
            for (var key in OutputHeader) {
                var data = this.outDataDict[OutputHeader[key]];
                this.sheet.getRange(row, data.col).setValue(data.name);
                col = data.col;
            }
            for (var i in this.solvers) {
                col++;
                this.sheet.getRange(row, col).setValue(this.solvers[i].getName());
            }
        };
        OutputData.prototype.writeWaves = function (startRow) {
            for (var i = 0; i < this.waves.length; i++) {
                this.writeWave(this.waves[i], startRow + i);
            }
        };
        OutputData.prototype.writeWave = function (wave, row) {
            this.sheet.getRange(row, this.getHeaderCol(OutputHeader.waveNumber)).setValue(wave.number);
            this.sheet.getRange(row, this.getHeaderCol(OutputHeader.waveUnitCount)).setValue(wave.unitCount);
            this.sheet.getRange(row, this.getHeaderCol(OutputHeader.waveUnit)).setValue(wave.unit.name + 's');
            var lastCol = this.getHeaderCol(OutputHeader.waveUnit) + 1;
            for (var i in this.solvers) {
                var solver = this.solvers[i];
                var units = solver.solveWave(wave.number);
                var retString = '';
                for (var j = 0; j < units.length; j++) {
                    retString += units[j].name;
                    if ((j + 1) < units.length) {
                        retString += ', ';
                    }
                }
                this.sheet.getRange(row, lastCol).setValue(retString);
                lastCol++;
            }
        };
        return OutputData;
    }());
    squadtd.OutputData = OutputData;
})(squadtd || (squadtd = {}));
var squadtd;
(function (squadtd) {
    var Validator = (function () {
        function Validator() {
        }
        Validator.IsStringValue = function (value) {
            return (typeof value) == 'string';
        };
        Validator.IsNumberValue = function (value) {
            return (typeof value) == 'number';
        };
        Validator.Validate = function (args) {
            var count = 1;
            for (var i = 0; i < args.length; i++) {
                var argCheck = args[i];
                if (typeof argCheck[0] != argCheck[1])
                    throw Utilities.formatString('Argument #%d[%s] is not of type %s', count, argCheck[0], argCheck[1]);
                count++;
            }
        };
        return Validator;
    }());
    squadtd.Validator = Validator;
})(squadtd || (squadtd = {}));
var squadtd;
(function (squadtd) {
    var Economy;
    (function (Economy) {
        var Constants;
        (function (Constants) {
            var Gas;
            (function (Gas) {
                Gas.maxUpgrades = 30;
                Gas.gasPerUpgrade = 15;
                Gas.costPerUpgrade = 50;
                function totalCost(upgradeNum) {
                    return upgradeNum * Gas.costPerUpgrade;
                }
                Gas.totalCost = totalCost;
            })(Gas = Constants.Gas || (Constants.Gas = {}));
            var Speed;
            (function (Speed) {
                Speed.maxUpgrades = 5;
                Speed.percentageBoost = 0.4;
                Speed.addedCostPerUpgrade = 60;
                function totalCost(upgradeNum) {
                    return (upgradeNum * Speed.addedCostPerUpgrade) * totalCost(upgradeNum - 1);
                }
                Speed.totalCost = totalCost;
            })(Speed = Constants.Speed || (Constants.Speed = {}));
            var Begin;
            (function (Begin) {
                Begin.minerals = 200;
                Begin.gas = 30;
            })(Begin = Constants.Begin || (Constants.Begin = {}));
        })(Constants = Economy.Constants || (Economy.Constants = {}));
    })(Economy = squadtd.Economy || (squadtd.Economy = {}));
})(squadtd || (squadtd = {}));
function onOpen() {
    squadtd.WaveData.Init();
    squadtd.UnitData.Init();
    squadtd.Writer.Init();
}
function onEdit(e) { }
function getBaseDamage(damageType, unitType) {
    squadtd.Validator.Validate([[damageType, "string"], [unitType, "string"]]);
    return squadtd.Calculator.baseDamage(damageType, unitType);
}
function getDPS(dmgMin, dmgMax, speed) {
    squadtd.Validator.Validate([
        [dmgMin, "number"],
        [dmgMax, "number"],
        [speed, "number"]
    ]);
    return squadtd.Calculator.DPS(dmgMin, dmgMax, speed);
}
function getDPSCostBenefit(cost, supply, dps) {
    squadtd.Validator.Validate([
        [cost, "number"],
        [supply, "number"],
        [dps, "number"]
    ]);
    return squadtd.Calculator.DPSCostBenefit(cost, supply, dps);
}
function getMostEffective(against) {
    squadtd.Validator.Validate([[against, "string"]]);
    var types = squadtd.Effectiveness.mostEffectiveAgainst(against);
    var str = "";
    for (var i = 0; i < types.length; i++) {
        str += types[i];
        if (i + 1 < types.length)
            str += ", ";
    }
    return str;
}
function vetDamage(ammount, wave) {
    squadtd.Validator.Validate([[ammount, "number"], [wave, "number"]]);
    return squadtd.VeteranUnit.GetDamage(ammount, wave);
}
function vetLife(ammount, wave) {
    squadtd.Validator.Validate([[ammount, "number"], [wave, "number"]]);
    return squadtd.VeteranUnit.GetHP(ammount, wave);
}
function vetSpeed(ammount, wave) {
    squadtd.Validator.Validate([[ammount, "number"], [wave, "number"]]);
    return squadtd.VeteranUnit.GetSpeed(ammount, wave);
}
function waveReward(wave) {
    squadtd.Validator.Validate([[wave, "number"]]);
    return squadtd.Wave.GetWaveReward(wave);
}
function terratron(wave) {
    squadtd.Validator.Validate([[wave, "number"]]);
    var terratron = squadtd.Wave.Terratron(wave);
    var answer = new Array();
    answer.push(new Array());
    answer[0].push(terratron.hp);
    answer[0].push(terratron.moveSpeed);
    answer[0].push(terratron.range);
    answer[0].push(terratron.minAttack);
    answer[0].push(terratron.maxAttack);
    answer[0].push(terratron.attackSpeed);
    return answer;
}
