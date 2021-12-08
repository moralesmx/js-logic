const OPERATIONS: { [key: string]: (logic: any[], data: any, args: any[][]) => any; } = {
  '$': (logic, data, args) => logic.slice(1).map(item => apply(item, data, args)).reduce((value, operand) => value?.[operand], data),
  '$$': (logic, data, args) => logic.slice(1).map(item => apply(item, data, args)).reduce((value, operand) => value?.[operand], args),

  '$+': (logic, data, args) => logic.length < 3
    ? +apply(logic[1], data, args)
    : logic.slice(1).map(item => apply(item, data, args)).reduce((value, operand) => value + operand),
  '$-': (logic, data, args) => logic.length < 3
    ? -apply(logic[1], data, args)
    : logic.slice(1).map(item => apply(item, data, args)).reduce((value, operand) => value - operand),

  '$*': (logic, data, args) => logic.slice(1).map(item => apply(item, data, args)).reduce((value, operand) => value * operand),
  '$/': (logic, data, args) => logic.slice(1).map(item => apply(item, data, args)).reduce((value, operand) => value / operand),
  '$%': (logic, data, args) => logic.slice(1).map(item => apply(item, data, args)).reduce((value, operand) => value % operand),
  '$**': (logic, data, args) => logic.slice(1).map(item => apply(item, data, args)).reduce((value, operand) => value ** operand),

  '$&&': (logic, data, args) => logic.slice(1).map(item => apply(item, data, args)).reduce((value, operand) => value && operand),
  '$||': (logic, data, args) => logic.slice(1).map(item => apply(item, data, args)).reduce((value, operand) => value || operand),
  '$??': (logic, data, args) => logic.slice(1).map(item => apply(item, data, args)).reduce((value, operand) => value ?? operand),

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
  '$=>': (logic, data, args) => (..._args: any[]) => apply(logic[1], data, [_args, ...args]),

  '$undefined': () => undefined,
  '$Infinity':  () => Infinity,
  '$NaN':       () => NaN,

  '$try': (logic, data, args) => {
    try { return apply(logic[1], data, args); }
    catch { return apply(logic[2], data, args); }
  },
};

function apply(logic: any, data: any, args: any[][]): any {
  if (logic instanceof Array && logic[0] in OPERATIONS) {
    return OPERATIONS[logic[0]](logic, data, args);
  }
  return logic;
}

export function JsLogic(logic: string, data?: any): any {
  return apply(JSON.parse(logic), data, []);
}
