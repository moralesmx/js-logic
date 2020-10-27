"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.apply = void 0;
function isRule(rule) {
    return Array.isArray(rule) && typeof rule[0] === 'string' && rule[0].startsWith('$');
}
const $ = (rule, data, local) => {
    let value = data;
    for (let i = 1; i < rule.length; i++) {
        if (value) {
            value = value[apply(rule[i], data, local)];
        }
        else {
            break;
        }
    }
    return value;
};
const $$ = (rule, data, local) => {
    let value = local;
    for (let i = 1; i < rule.length; i++) {
        if (value) {
            value = value[apply(rule[i], data, local)];
        }
        else {
            break;
        }
    }
    return value;
};
const $And = (rule, data, local) => {
    let value = apply(rule[1], data, local);
    for (let i = 2; i < rule.length; i++) {
        value = value && apply(rule[i], data, local);
    }
    return value;
};
const $Or = (rule, data, local) => {
    let value = apply(rule[1], data, local);
    for (let i = 2; i < rule.length; i++) {
        value = value || apply(rule[i], data, local);
    }
    return value;
};
const $Equal = (rule, data, local) => {
    return apply(rule[1], data, local) == apply(rule[2], data, local);
};
const $StrictEqual = (rule, data, local) => {
    return apply(rule[1], data, local) === apply(rule[2], data, local);
};
const $NotEqual = (rule, data, local) => {
    return apply(rule[1], data, local) != apply(rule[2], data, local);
};
const $StrictNotEqual = (rule, data, local) => {
    return apply(rule[1], data, local) !== apply(rule[2], data, local);
};
const $Not = (rule, data, local) => {
    return !apply(rule[1], data, local);
};
const $DoubleNot = (rule, data, local) => {
    return !!apply(rule[1], data, local);
};
const $GraterThan = (rule, data, local) => {
    return apply(rule[1], data, local) > apply(rule[2], data, local);
};
const $GraterThanOrEqual = (rule, data, local) => {
    return apply(rule[1], data, local) >= apply(rule[2], data, local);
};
const $LessThan = (rule, data, local) => {
    return apply(rule[1], data, local) < apply(rule[2], data, local);
};
const $LessThanOrEqual = (rule, data, local) => {
    return apply(rule[1], data, local) <= apply(rule[2], data, local);
};
const $Addition = (rule, data, local) => {
    let value = +apply(rule[1], data, local);
    for (let i = 2; i < rule.length; i++) {
        value = value + +apply(rule[i], data, local);
    }
    return value;
};
const $Multiplication = (rule, data, local) => {
    let value = +apply(rule[1], data, local);
    for (let i = 2; i < rule.length; i++) {
        value = value * apply(rule[i], data, local);
    }
    return value;
};
const $Subtraction = (rule, data, local) => {
    return apply(rule[1], data, local) - apply(rule[2], data, local);
};
const $Division = (rule, data, local) => {
    return apply(rule[1], data, local) / apply(rule[2], data, local);
};
const $Modulo = (rule, data, local) => {
    return apply(rule[1], data, local) % apply(rule[2], data, local);
};
const $Exponentiation = (rule, data, local) => {
    return Math.pow(apply(rule[1], data, local), apply(rule[2], data, local));
};
const $Map = (rule, data, local) => {
    const array = apply(rule[1], data, local);
    if (Array.isArray(array)) {
        return array.map(item => apply(rule[2], data, item));
    }
    // ? Throw error
    return undefined;
};
const $Filter = (rule, data, local) => {
    const array = apply(rule[1], data, local);
    if (Array.isArray(array)) {
        return array.filter(item => apply(rule[2], data, item));
    }
    // ? Throw error
    return undefined;
};
const $Every = (rule, data, local) => {
    const array = apply(rule[1], data, local);
    if (Array.isArray(array)) {
        return array.every(item => apply(rule[2], data, item));
    }
    // ? Throw error
    return false;
};
const $Some = (rule, data, local) => {
    const array = apply(rule[1], data, local);
    if (Array.isArray(array)) {
        return array.some(item => apply(rule[2], data, item));
    }
    // ? Throw error
    return false;
};
const $Reduce = (rule, data, local) => {
    const array = apply(rule[1], data, local);
    if (Array.isArray(array)) {
        return array.reduce(item => apply(rule[2], data, item), apply(rule[3], data, local));
    }
    // ? Throw error
    return undefined;
};
const $Typeof = (rule, data, local) => {
    return typeof apply(rule[1], data, local) === apply(rule[2], data, local);
};
const $In = (rule, data, local) => {
    return apply(rule[1], data, local) in apply(rule[2], data, local);
};
const $Method = (rule, data, local) => {
    return apply(rule[1], data, local)[apply(rule[2], data, local)](rule.slice(3).map(item => apply(item, data, local)));
};
function apply(rule, data, local) {
    if (isRule(rule)) {
        switch (rule[0]) {
            case '$': return $(rule, data, local);
            case '$$': return $$(rule, data, local);
            case '$&&': return $And(rule, data, local);
            case '$||': return $Or(rule, data, local);
            case '$==': return $Equal(rule, data, local);
            case '$===': return $StrictEqual(rule, data, local);
            case '$!=': return $NotEqual(rule, data, local);
            case '$!==': return $StrictNotEqual(rule, data, local);
            case '$!': return $Not(rule, data, local);
            case '$!!': return $DoubleNot(rule, data, local);
            case '$>': return $GraterThan(rule, data, local);
            case '$>=': return $GraterThanOrEqual(rule, data, local);
            case '$<': return $LessThan(rule, data, local);
            case '$<=': return $LessThanOrEqual(rule, data, local);
            case '$+': return $Addition(rule, data, local);
            case '$*': return $Multiplication(rule, data, local);
            case '$-': return $Subtraction(rule, data, local);
            case '$/': return $Division(rule, data, local);
            case '$%': return $Modulo(rule, data, local);
            case '$**': return $Exponentiation(rule, data, local);
            case '$map': return $Map(rule, data, local);
            case '$filter': return $Filter(rule, data, local);
            case '$every': return $Every(rule, data, local);
            case '$some': return $Some(rule, data, local);
            case '$reduce': return $Reduce(rule, data, local);
            case '$typeof': return $Typeof(rule, data, local);
            case '$in': return $In(rule, data, local);
            case '$method': return $Method(rule, data, local);
        }
    }
    return rule;
}
exports.apply = apply;
