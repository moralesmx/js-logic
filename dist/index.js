"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JsLogic = void 0;
const OPERATIONS = {
    '$': (logic, data, args) => logic.slice(1).map(item => apply(item, data, args)).reduce((value, operand) => value === null || value === void 0 ? void 0 : value[operand], data),
    '$$': (logic, data, args) => logic.slice(1).map(item => apply(item, data, args)).reduce((value, operand) => value === null || value === void 0 ? void 0 : value[operand], args),
    '$+': (logic, data, args) => logic.length < 3
        ? +apply(logic[1], data, args)
        : logic.slice(1).map(item => apply(item, data, args)).reduce((value, operand) => value + operand),
    '$-': (logic, data, args) => logic.length < 3
        ? -apply(logic[1], data, args)
        : logic.slice(1).map(item => apply(item, data, args)).reduce((value, operand) => value - operand),
    '$*': (logic, data, args) => logic.slice(1).map(item => apply(item, data, args)).reduce((value, operand) => value * operand),
    '$/': (logic, data, args) => logic.slice(1).map(item => apply(item, data, args)).reduce((value, operand) => value / operand),
    '$%': (logic, data, args) => logic.slice(1).map(item => apply(item, data, args)).reduce((value, operand) => value % operand),
    '$**': (logic, data, args) => logic.slice(1).map(item => apply(item, data, args)).reduce((value, operand) => Math.pow(value, operand)),
    '$&&': (logic, data, args) => logic.slice(1).map(item => apply(item, data, args)).reduce((value, operand) => value && operand),
    '$||': (logic, data, args) => logic.slice(1).map(item => apply(item, data, args)).reduce((value, operand) => value || operand),
    '$??': (logic, data, args) => logic.slice(1).map(item => apply(item, data, args)).reduce((value, operand) => value !== null && value !== void 0 ? value : operand),
    '$!': (logic, data, args) => !apply(logic[1], data, args),
    '$!!': (logic, data, args) => !!apply(logic[1], data, args),
    '$>': (logic, data, args) => apply(logic[1], data, args) > apply(logic[2], data, args),
    '$<': (logic, data, args) => apply(logic[1], data, args) < apply(logic[2], data, args),
    '$>=': (logic, data, args) => apply(logic[1], data, args) >= apply(logic[2], data, args),
    '$<=': (logic, data, args) => apply(logic[1], data, args) <= apply(logic[2], data, args),
    '$==': (logic, data, args) => apply(logic[1], data, args) == apply(logic[2], data, args),
    '$!=': (logic, data, args) => apply(logic[1], data, args) != apply(logic[2], data, args),
    '$===': (logic, data, args) => apply(logic[1], data, args) === apply(logic[2], data, args),
    '$!==': (logic, data, args) => apply(logic[1], data, args) !== apply(logic[2], data, args),
    '$typeof': (logic, data, args) => typeof apply(logic[1], data, args),
    '$in': (logic, data, args) => apply(logic[1], data, args) in apply(logic[2], data, args),
    '$?:': (logic, data, args) => apply(logic[1], data, args) ? apply(logic[2], data, args) : apply(logic[3], data, args),
    '$()': (logic, data, args) => apply(logic[1], data, args)[apply(logic[2], data, args)](...logic.slice(3).map(item => apply(item, data, args))),
    '$[]': (logic, data, args) => logic.slice(1).map(item => apply(item, data, args)),
    '$=>': (logic, data, args) => (..._args) => apply(logic[1], data, [_args, ...args]),
    '$undefined': () => undefined,
    '$Infinity': () => Infinity,
    '$NaN': () => NaN,
    '$try': (logic, data, args) => {
        try {
            return apply(logic[1], data, args);
        }
        catch (_a) {
            return apply(logic[2], data, args);
        }
    },
};
function apply(logic, data, args) {
    if (logic instanceof Array && logic[0] in OPERATIONS) {
        return OPERATIONS[logic[0]](logic, data, args);
    }
    return logic;
}
function JsLogic(logic, data) {
    return apply(JSON.parse(logic), data, []);
}
exports.JsLogic = JsLogic;
