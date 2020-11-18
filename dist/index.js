"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JsLogic = void 0;
function isRule(rule) {
    return Array.isArray(rule) && typeof rule[0] === 'string' && rule[0].startsWith('$');
}
const $ = (rule, data, args) => {
    let value = data;
    for (let i = 1; i < rule.length; i++) {
        if (value) {
            value = value[apply(rule[i], data, args)];
        }
        else {
            break;
        }
    }
    return value;
};
const $$ = (rule, data, args) => {
    let value = args;
    for (let i = 1; i < rule.length; i++) {
        if (value) {
            value = value[apply(rule[i], data, args)];
        }
        else {
            break;
        }
    }
    return value;
};
const $And = (rule, data, args) => {
    let value = apply(rule[1], data, args);
    for (let i = 2; i < rule.length; i++) {
        value = value && apply(rule[i], data, args);
    }
    return value;
};
const $Or = (rule, data, args) => {
    let value = apply(rule[1], data, args);
    for (let i = 2; i < rule.length; i++) {
        value = value || apply(rule[i], data, args);
    }
    return value;
};
const $Equal = (rule, data, args) => {
    return apply(rule[1], data, args) == apply(rule[2], data, args);
};
const $StrictEqual = (rule, data, args) => {
    return apply(rule[1], data, args) === apply(rule[2], data, args);
};
const $NotEqual = (rule, data, args) => {
    return apply(rule[1], data, args) != apply(rule[2], data, args);
};
const $StrictNotEqual = (rule, data, args) => {
    return apply(rule[1], data, args) !== apply(rule[2], data, args);
};
const $Not = (rule, data, args) => {
    return !apply(rule[1], data, args);
};
const $DoubleNot = (rule, data, args) => {
    return !!apply(rule[1], data, args);
};
const $GraterThan = (rule, data, args) => {
    return apply(rule[1], data, args) > apply(rule[2], data, args);
};
const $GraterThanOrEqual = (rule, data, args) => {
    return apply(rule[1], data, args) >= apply(rule[2], data, args);
};
const $LessThan = (rule, data, args) => {
    return apply(rule[1], data, args) < apply(rule[2], data, args);
};
const $LessThanOrEqual = (rule, data, args) => {
    return apply(rule[1], data, args) <= apply(rule[2], data, args);
};
const $Addition = (rule, data, args) => {
    let value = +apply(rule[1], data, args);
    for (let i = 2; i < rule.length; i++) {
        value = value + +apply(rule[i], data, args);
    }
    return value;
};
const $Multiplication = (rule, data, args) => {
    let value = +apply(rule[1], data, args);
    for (let i = 2; i < rule.length; i++) {
        value = value * +apply(rule[i], data, args);
    }
    return value;
};
const $Subtraction = (rule, data, args) => {
    return apply(rule[1], data, args) - apply(rule[2], data, args);
};
const $Division = (rule, data, args) => {
    return apply(rule[1], data, args) / apply(rule[2], data, args);
};
const $Modulo = (rule, data, args) => {
    return apply(rule[1], data, args) % apply(rule[2], data, args);
};
const $Exponentiation = (rule, data, args) => {
    return Math.pow(apply(rule[1], data, args), apply(rule[2], data, args));
};
const $In = (rule, data, args) => {
    return apply(rule[1], data, args) in apply(rule[2], data, args);
};
const $Typeof = (rule, data, args) => {
    return typeof apply(rule[1], data, args);
};
const $Method = (rule, data, args) => {
    return apply(rule[1], data, args)[apply(rule[2], data, args)](...rule.slice(3).map(item => apply(item, data, args)));
};
const $Arrow = (rule, data, args) => {
    return (...args) => apply(rule[1], data, args);
};
const $Array = (rule, data, args) => {
    return rule.slice(1).map(item => apply(item, data, args));
};
const $Undefined = (rule, data, args) => {
    return undefined;
};
const apply = (rule, data, args) => {
    if (isRule(rule)) {
        switch (rule[0]) {
            case '$': return $(rule, data, args);
            case '$$': return $$(rule, data, args);
            case '$&&': return $And(rule, data, args);
            case '$||': return $Or(rule, data, args);
            case '$==': return $Equal(rule, data, args);
            case '$===': return $StrictEqual(rule, data, args);
            case '$!=': return $NotEqual(rule, data, args);
            case '$!==': return $StrictNotEqual(rule, data, args);
            case '$!': return $Not(rule, data, args);
            case '$!!': return $DoubleNot(rule, data, args);
            case '$>': return $GraterThan(rule, data, args);
            case '$>=': return $GraterThanOrEqual(rule, data, args);
            case '$<': return $LessThan(rule, data, args);
            case '$<=': return $LessThanOrEqual(rule, data, args);
            case '$+': return $Addition(rule, data, args);
            case '$*': return $Multiplication(rule, data, args);
            case '$-': return $Subtraction(rule, data, args);
            case '$/': return $Division(rule, data, args);
            case '$%': return $Modulo(rule, data, args);
            case '$**': return $Exponentiation(rule, data, args);
            case '$in': return $In(rule, data, args);
            case '$typeof': return $Typeof(rule, data, args);
            case '$()': return $Method(rule, data, args);
            case '$=>': return $Arrow(rule, data, args);
            case '$[]': return $Array(rule, data, args);
            case '$undefined': return $Undefined(rule, data, args);
        }
    }
    return rule;
};
function JsLogic(rule, data) {
    return apply(rule, data, undefined);
}
exports.JsLogic = JsLogic;
