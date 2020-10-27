type JL$ = ['$', ...JLorValue[]];
type JL$And = ['$&&', ...JLorValue[]];
type JL$Or = ['$||', ...JLorValue[]];
type JL$Equal = ['$==', JLorValue, JLorValue];
type JL$StrictEqual = ['$===', JLorValue, JLorValue];
type JL$NotEqual = ['$!=', JLorValue, JLorValue];
type JL$StrictNotEqual = ['$!==', JLorValue, JLorValue];
type JL$Not = ['$!', JLorValue];
type JL$DoubleNot = ['$!!', JLorValue];
type JL$GraterThan = ['$>', JLorValue, JLorValue];
type JL$GraterThanOrEqual = ['$>=', JLorValue, JLorValue];
type JL$LessThan = ['$<', JLorValue, JLorValue];
type JL$LessThanOrEqual = ['$<=', JLorValue, JLorValue];

type JL = JL$
  | JL$And
  | JL$Or
  | JL$Equal
  | JL$StrictEqual
  | JL$NotEqual
  | JL$StrictNotEqual
  | JL$Not
  | JL$DoubleNot
  | JL$GraterThan
  | JL$GraterThanOrEqual
  | JL$LessThan
  | JL$LessThanOrEqual;

type JLorValue = string | number | JL;

function isLogic(logic: JLorValue): logic is JL {
  return Array.isArray(logic) && typeof logic[0] === 'string' && logic[0].startsWith('$');
}

function $(logic: JL$, data: any): any {
  let value = data;
  for (let i = 1; i < logic.length; i++) {
    if (value) {
      value = value[apply(logic[i], data)];
    } else {
      break;
    }
  }
  return value;
};

function $And(logic: JL$And, data: any): any {
  let value = apply(logic[1], data);
  for (let i = 2; i < logic.length; i++) {
    value = value && apply(logic[i], data);
  }
  return value;
};

function $Or(logic: JL$Or, data: any): any {
  let value = apply(logic[1], data);
  for (let i = 2; i < logic.length; i++) {
    value = value || apply(logic[i], data);
  }
  return value;
};

function $Equal(logic: JL$Equal, data: any): boolean {
  return apply(logic[1], data) == apply(logic[2], data);
};

function $StrictEqual(logic: JL$StrictEqual, data: any): boolean {
  return apply(logic[1], data) === apply(logic[2], data);
};

function $NotEqual(logic: JL$NotEqual, data: any): boolean {
  return apply(logic[1], data) != apply(logic[2], data);
};

function $StrictNotEqual(logic: JL$StrictNotEqual, data: any): boolean {
  return apply(logic[1], data) !== apply(logic[2], data);
};

function $Not(logic: JL$Not, data: any): boolean {
  return !apply(logic[1], data);
};

function $DoubleNot(logic: JL$DoubleNot, data: any): boolean {
  return !!apply(logic[1], data);
};

function $GraterThan(logic: JL$GraterThan, data: any): boolean {
  return apply(logic[1], data) > apply(logic[2], data);
};

function $GraterThanOrEqual(logic: JL$GraterThanOrEqual, data: any): boolean {
  return apply(logic[1], data) >= apply(logic[2], data);
};

function $LessThan(logic: JL$LessThan, data: any): boolean {
  return apply(logic[1], data) < apply(logic[2], data);
};

function $LessThanOrEqual(logic: JL$LessThanOrEqual, data: any): boolean {
  return apply(logic[1], data) <= apply(logic[2], data);
};

export function apply(logic: JLorValue, data: any) {
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
