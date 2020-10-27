"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.apply = void 0;
function isLogic(logic) {
    return Array.isArray(logic) && typeof logic[0] === 'string' && logic[0].startsWith('$');
}
function $(logic, data) {
    let value = data;
    for (let i = 1; i < logic.length; i++) {
        if (value) {
            value = value[apply(logic[i], data)];
        }
        else {
            break;
        }
    }
    return value;
}
;
function $And(logic, data) {
    let value = apply(logic[1], data);
    for (let i = 2; i < logic.length; i++) {
        value = value && apply(logic[i], data);
    }
    return value;
}
;
function $Or(logic, data) {
    let value = apply(logic[1], data);
    for (let i = 2; i < logic.length; i++) {
        value = value || apply(logic[i], data);
    }
    return value;
}
;
function $Equal(logic, data) {
    return apply(logic[1], data) == apply(logic[2], data);
}
;
function $StrictEqual(logic, data) {
    return apply(logic[1], data) === apply(logic[2], data);
}
;
function $NotEqual(logic, data) {
    return apply(logic[1], data) != apply(logic[2], data);
}
;
function $StrictNotEqual(logic, data) {
    return apply(logic[1], data) !== apply(logic[2], data);
}
;
function $Not(logic, data) {
    return !apply(logic[1], data);
}
;
function $DoubleNot(logic, data) {
    return !!apply(logic[1], data);
}
;
function $GraterThan(logic, data) {
    return apply(logic[1], data) > apply(logic[2], data);
}
;
function $GraterThanOrEqual(logic, data) {
    return apply(logic[1], data) >= apply(logic[2], data);
}
;
function $LessThan(logic, data) {
    return apply(logic[1], data) < apply(logic[2], data);
}
;
function $LessThanOrEqual(logic, data) {
    return apply(logic[1], data) <= apply(logic[2], data);
}
;
function apply(logic, data) {
    if (isLogic(logic)) {
        switch (logic[0]) {
            case '$': return $(logic, data);
            case '$&&': return $And(logic, data);
            case '$||': return $Or(logic, data);
            case '$==': return $Equal(logic, data);
            case '$===': return $StrictEqual(logic, data);
            case '$!=': return $NotEqual(logic, data);
            case '$!==': return $StrictNotEqual(logic, data);
            case '$!': return $Not(logic, data);
            case '$!!': return $DoubleNot(logic, data);
            case '$>': return $GraterThan(logic, data);
            case '$>=': return $GraterThanOrEqual(logic, data);
            case '$<': return $LessThan(logic, data);
            case '$<=': return $LessThanOrEqual(logic, data);
        }
    }
    return logic;
}
exports.apply = apply;
