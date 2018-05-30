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
            this._life = 0;
            this._name = name;
            this._life = life;
            this._armorType = armorType;
            this._attackType = attackType;
            this._minAttack = minAttack;
            this._maxAttack = maxAttack;
            this._attackSpeed = attackSpeed;
            this._moveSpeed = moveSpeed;
            this._range = range;
        }
        Unit.prototype.DPS = function () {
            return squadtd.Calculator.DPS(this._minAttack, this._maxAttack, this._attackSpeed);
        };
        Unit.prototype.Name = function () {
            return this._name;
        };
        Unit.prototype.Life = function () {
            return this._life;
        };
        Unit.prototype.MoveSpeed = function () {
            return this._moveSpeed;
        };
        Unit.prototype.Range = function () {
            return this._range;
        };
        Unit.prototype.AttackMin = function () {
            return this._minAttack;
        };
        Unit.prototype.AttackMax = function () {
            return this._maxAttack;
        };
        Unit.prototype.AttackSpeed = function () {
            return this._attackSpeed;
        };
        Unit.prototype.AttackType = function () {
            return this._attackType;
        };
        Unit.prototype.ArmorType = function () {
            return this._armorType;
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
            _this._wave = wave;
            _this._reward = reward;
            return _this;
        }
        WaveUnit.prototype.Wave = function () {
            return this._wave;
        };
        WaveUnit.prototype.Reward = function () {
            return this._reward;
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
        WaveFacade.Terraton = function (wave) {
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
            return new squadtd.WaveUnit("Terraton", wave, 0, life, squadtd.UnitType.biological, squadtd.DamageType.chaos, atkMin, atkMax, 1, 4, 2.25);
        };
        WaveFacade.startWaveReward = 13;
        return WaveFacade;
    }());
    squadtd.WaveFacade = WaveFacade;
})(squadtd || (squadtd = {}));
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
    return squadtd.Veteran.GetDamage(ammount, wave);
}
function vetLife(ammount, wave) {
    squadtd.Validator.Validate([[ammount, 'number'], [wave, 'number']]);
    return squadtd.Veteran.GetLife(ammount, wave);
}
function vetSpeed(ammount, wave) {
    squadtd.Validator.Validate([[ammount, 'number'], [wave, 'number']]);
    return squadtd.Veteran.GetSpeed(ammount, wave);
}
function waveReward(wave) {
    squadtd.Validator.Validate([[wave, 'number']]);
    return squadtd.WaveFacade.GetWaveReward(wave);
}
function terratron(wave) {
    squadtd.Validator.Validate([[wave, 'number']]);
    var terra = squadtd.WaveFacade.Terraton(wave);
    var answer = new Array();
    answer.push(new Array());
    answer[0].push(terra.Life());
    answer[0].push(terra.MoveSpeed());
    answer[0].push(terra.Range());
    answer[0].push(terra.AttackMin());
    answer[0].push(terra.AttackMax());
    answer[0].push(terra.AttackSpeed());
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
    var Veteran = (function () {
        function Veteran() {
        }
        Veteran.GetDamage = function (damage, wave) {
            var bonus = wave * this.damagePerWave;
            return damage * (1 + bonus);
        };
        Veteran.GetLife = function (life, wave) {
            var bonus = wave * this.hpPerWave;
            var total = life * (1 + bonus);
            if (wave <= 3)
                return Math.floor(total);
            return Math.ceil(total);
        };
        Veteran.GetSpeed = function (speed, wave) {
            var bonus = wave * this.speedPerWave;
            var total = speed * (1 - bonus);
            return Number(total.toFixed(2));
        };
        Veteran.damagePerWave = .02;
        Veteran.hpPerWave = .02;
        Veteran.speedPerWave = .01;
        return Veteran;
    }());
    squadtd.Veteran = Veteran;
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
            var vetSpeed = squadtd.Veteran.GetSpeed(_this._attackSpeed, _this._wave);
            var vetMinAtk = squadtd.Veteran.GetDamage(_this._minAttack, _this._wave);
            var vetMaxAtk = squadtd.Veteran.GetDamage(_this._maxAttack, _this._wave);
            var vetLife = squadtd.Veteran.GetLife(_this._life, _this._wave);
            _this._bonusMaxAttack = vetMaxAtk - _this._maxAttack;
            _this._bonusMinAttack = vetMinAtk - _this._minAttack;
            _this._bonusLife = vetLife - _this._life;
            _this._bonusAttackSpeed = _this._attackSpeed - vetSpeed;
            _this._maxAttack = vetMaxAtk;
            _this._minAttack = vetMinAtk;
            _this._attackSpeed = vetSpeed;
            _this._life = vetLife;
            return _this;
        }
        VeteranUnit.prototype.BonusAttackMin = function () {
            return this._bonusMinAttack;
        };
        VeteranUnit.prototype.BonusAttackMax = function () {
            return this._bonusMaxAttack;
        };
        VeteranUnit.prototype.BonusAttackSpeed = function () {
            return this._bonusAttackSpeed;
        };
        VeteranUnit.prototype.BonusLife = function () {
            return this._bonusLife;
        };
        return VeteranUnit;
    }(squadtd.WaveUnit));
    squadtd.VeteranUnit = VeteranUnit;
})(squadtd || (squadtd = {}));
