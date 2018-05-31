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
            if (damage == squadtd.DamageType.chaos && unit == squadtd.UnitType.biological)
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
    var Unit = (function () {
        function Unit(name, life, armorType, attackType, minAttack, maxAttack, attackSpeed, moveSpeed, range) {
            this.life = 0;
            this.name = name || '';
            this.life = life || 0;
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
            this.life = other.life;
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
        function WaveUnit(name, wave, reward, life, armorType, attackType, minAttack, maxAttack, attackSpeed, moveSpeed, range) {
            var _this = _super.call(this, name, life, armorType, attackType, minAttack, maxAttack, attackSpeed, moveSpeed, range) || this;
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
    var WaveFacade = (function () {
        function WaveFacade() {
        }
        WaveFacade.GetWaveReward = function (wave) {
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
        WaveFacade.Terratron = function (wave) {
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
        WaveFacade.startWaveReward = 13;
        return WaveFacade;
    }());
    squadtd.WaveFacade = WaveFacade;
})(squadtd || (squadtd = {}));
var squadtd;
(function (squadtd) {
    var Importer = (function () {
        function Importer(sheet, stringValues, startCol, startRow, numCols, numRows) {
            this.maxRowDepth = 200;
            this.maxColDepth = this.maxRowDepth;
            this.headerRow = -1;
            this.headerColDict = {};
            this.lastRow = 1;
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
        return Importer;
    }());
    squadtd.Importer = Importer;
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
        WColNames["unitLife"] = "Life";
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
            var curRow = this.ValueData[row];
            var name = curRow[this.getCol(WColNames.name)];
            var number = curRow[this.getCol(WColNames.number)];
            var count = curRow[this.getCol(WColNames.unitCount)];
            var unit = new squadtd.WaveUnit(name);
            unit.armorType = curRow[this.getCol(WColNames.unitType)];
            unit.attackSpeed = curRow[this.getCol(WColNames.unitAtkSpeed)];
            unit.attackType = curRow[this.getCol(WColNames.unitAttack)];
            unit.life = curRow[this.getCol(WColNames.unitLife)];
            unit.maxAttack = curRow[this.getCol(WColNames.unitAtkMax)];
            unit.minAttack = curRow[this.getCol(WColNames.unitAtkMin)];
            unit.moveSpeed = curRow[this.getCol(WColNames.unitMove)];
            unit.range = curRow[this.getCol(WColNames.unitRange)];
            unit.reward = curRow[this.getCol(WColNames.unitReward)];
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
        var importer;
        function Init() {
            if (!SpreadsheetApp)
                throw 'SpreadsheetApp variable not existant';
            var importSheet = SpreadsheetApp.getActive().getSheetByName('Waves');
            if (!importSheet)
                throw Utilities.formatString('Cannot find spreadsheet named Waves to import');
            importer = new squadtd.WaveImporter(importSheet);
            importer.loadAllData();
        }
        WaveData.Init = Init;
    })(WaveData = squadtd.WaveData || (squadtd.WaveData = {}));
})(squadtd || (squadtd = {}));
function onOpen() {
    squadtd.WaveData.Init();
}
function onEdit(e) {
}
function getBaseDamage(damageType, unitType) {
    squadtd.Validator.Validate([[damageType, 'string'], [unitType, 'string']]);
    return squadtd.Calculator.baseDamage(damageType, unitType);
}
function getDPS(dmgMin, dmgMax, speed) {
    squadtd.Validator.Validate([[dmgMin, 'number'], [dmgMax, 'number'], [speed, 'number']]);
    return squadtd.Calculator.DPS(dmgMin, dmgMax, speed);
}
function getDPSCostBenefit(cost, supply, dps) {
    squadtd.Validator.Validate([[cost, 'number'], [supply, 'number'], [dps, 'number']]);
    return squadtd.Calculator.DPSCostBenefit(cost, supply, dps);
}
function vetDamage(ammount, wave) {
    squadtd.Validator.Validate([[ammount, 'number'], [wave, 'number']]);
    return squadtd.VeteranUnit.GetDamage(ammount, wave);
}
function vetLife(ammount, wave) {
    squadtd.Validator.Validate([[ammount, 'number'], [wave, 'number']]);
    return squadtd.VeteranUnit.GetLife(ammount, wave);
}
function vetSpeed(ammount, wave) {
    squadtd.Validator.Validate([[ammount, 'number'], [wave, 'number']]);
    return squadtd.VeteranUnit.GetSpeed(ammount, wave);
}
function waveReward(wave) {
    squadtd.Validator.Validate([[wave, 'number']]);
    return squadtd.WaveFacade.GetWaveReward(wave);
}
function terratron(wave) {
    squadtd.Validator.Validate([[wave, 'number']]);
    var terratron = squadtd.WaveFacade.Terratron(wave);
    var answer = new Array();
    answer.push(new Array());
    answer[0].push(terratron.life);
    answer[0].push(terratron.moveSpeed);
    answer[0].push(terratron.range);
    answer[0].push(terratron.minAttack);
    answer[0].push(terratron.maxAttack);
    answer[0].push(terratron.attackSpeed);
    return answer;
}
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
    var VeteranUnit = (function (_super) {
        __extends(VeteranUnit, _super);
        function VeteranUnit(name, wave, reward, life, armorType, attackType, minAttack, maxAttack, attackSpeed, moveSpeed, range) {
            var _this = _super.call(this, name, wave, reward, life, armorType, attackType, minAttack, maxAttack, attackSpeed, moveSpeed, range) || this;
            _this.setupVeteranData(_this.wave, _this.attackSpeed, _this.minAttack, _this.maxAttack, _this.life);
            return _this;
        }
        VeteranUnit.GetDamage = function (damage, wave) {
            var bonus = wave * this.damagePerWave;
            return damage * (1 + bonus);
        };
        VeteranUnit.GetLife = function (life, wave) {
            var bonus = wave * this.hpPerWave;
            var total = life * (1 + bonus);
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
            var vetLife = VeteranUnit.GetLife(life, wave);
            this.bonusMaxAttack = vetMaxAtk - this.maxAttack;
            this.bonusMinAttack = vetMinAtk - this.minAttack;
            this.bonusLife = vetLife - this.life;
            this.bonusAttackSpeed = this.attackSpeed - vetSpeed;
            this.maxAttack = vetMaxAtk;
            this.minAttack = vetMinAtk;
            this.attackSpeed = vetSpeed;
            this.life = vetLife;
        };
        VeteranUnit.prototype.copyFrom = function (other) {
            _super.prototype.copyFrom.call(this, other);
            this.setupVeteranData(other.wave, other.attackSpeed, other.minAttack, other.maxAttack, other.life);
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
            this.reward = squadtd.WaveFacade.GetWaveReward(number);
        }
        return Wave;
    }());
    squadtd.Wave = Wave;
})(squadtd || (squadtd = {}));
