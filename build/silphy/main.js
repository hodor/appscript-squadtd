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
