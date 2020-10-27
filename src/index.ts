type Rule$ = ['$', ...RuleOrValue[]];
type Rule$$ = ['$$', ...RuleOrValue[]];
type Rule$And = ['$&&', ...RuleOrValue[]];
type Rule$Or = ['$||', ...RuleOrValue[]];
type Rule$Equal = ['$==', RuleOrValue, RuleOrValue];
type Rule$StrictEqual = ['$===', RuleOrValue, RuleOrValue];
type Rule$NotEqual = ['$!=', RuleOrValue, RuleOrValue];
type Rule$StrictNotEqual = ['$!==', RuleOrValue, RuleOrValue];
type Rule$Not = ['$!', RuleOrValue];
type Rule$DoubleNot = ['$!!', RuleOrValue];
type Rule$GraterThan = ['$>', RuleOrValue, RuleOrValue];
type Rule$GraterThanOrEqual = ['$>=', RuleOrValue, RuleOrValue];
type Rule$LessThan = ['$<', RuleOrValue, RuleOrValue];
type Rule$LessThanOrEqual = ['$<=', RuleOrValue, RuleOrValue];

type Rule$Addition = ['$+', ...RuleOrValue[]];
type Rule$Multiplication = ['$*', ...RuleOrValue[]];
type Rule$Subtraction = ['$-', RuleOrValue, RuleOrValue];
type Rule$Division = ['$/', RuleOrValue, RuleOrValue];
type Rule$Modulo = ['$%', RuleOrValue, RuleOrValue];
type Rule$Exponentiation = ['$**', RuleOrValue, RuleOrValue];

type Rule$Map = ['$map', RuleOrValue, RuleOrValue];
type Rule$Filter = ['$filter', RuleOrValue, RuleOrValue];
type Rule$Every = ['$every', RuleOrValue, RuleOrValue];
type Rule$Some = ['$some', RuleOrValue, RuleOrValue];
type Rule$Reduce = ['$reduce', RuleOrValue, RuleOrValue, RuleOrValue];

type Rule$Typeof = ['$typeof', RuleOrValue, RuleOrValue];
type Rule$In = ['$in', RuleOrValue, RuleOrValue];

type Rule$Method = ['$method', RuleOrValue, RuleOrValue, ...RuleOrValue[]];

type Rule = Rule$
  | Rule$$
  | Rule$And
  | Rule$Or
  | Rule$Equal
  | Rule$StrictEqual
  | Rule$NotEqual
  | Rule$StrictNotEqual
  | Rule$Not
  | Rule$DoubleNot
  | Rule$GraterThan
  | Rule$GraterThanOrEqual
  | Rule$LessThan
  | Rule$LessThanOrEqual
  | Rule$Addition
  | Rule$Multiplication
  | Rule$Subtraction
  | Rule$Division
  | Rule$Modulo
  | Rule$Exponentiation
  | Rule$Map
  | Rule$Filter
  | Rule$Every
  | Rule$Some
  | Rule$Reduce
  | Rule$Typeof
  | Rule$In
  | Rule$Method
  ;

type RuleOrValue = string | number | Rule;

type Operator<Rule, Returns> = (rule: Rule, data: any, local: any) => Returns;

function isRule(rule: RuleOrValue): rule is Rule {
  return Array.isArray(rule) && typeof rule[0] === 'string' && rule[0].startsWith('$');
}

const $: Operator<Rule$, any> = (rule, data, local) => {
  let value = data;
  for (let i = 1; i < rule.length; i++) {
    if (value) {
      value = value[apply(rule[i], data, local)];
    } else {
      break;
    }
  }
  return value;
};

const $$: Operator<Rule$$, any> = (rule, data, local) => {
  let value = local;
  for (let i = 1; i < rule.length; i++) {
    if (value) {
      value = value[apply(rule[i], data, local)];
    } else {
      break;
    }
  }
  return value;
};

const $And: Operator<Rule$And, any> = (rule, data, local) => {
  let value = apply(rule[1], data, local);
  for (let i = 2; i < rule.length; i++) {
    value = value && apply(rule[i], data, local);
  }
  return value;
};

const $Or: Operator<Rule$Or, any> = (rule, data, local) => {
  let value = apply(rule[1], data, local);
  for (let i = 2; i < rule.length; i++) {
    value = value || apply(rule[i], data, local);
  }
  return value;
};

const $Equal: Operator<Rule$Equal, boolean> = (rule, data, local) => {
  return apply(rule[1], data, local) == apply(rule[2], data, local);
};

const $StrictEqual: Operator<Rule$StrictEqual, boolean> = (rule, data, local) => {
  return apply(rule[1], data, local) === apply(rule[2], data, local);
};

const $NotEqual: Operator<Rule$NotEqual, boolean> = (rule, data, local) => {
  return apply(rule[1], data, local) != apply(rule[2], data, local);
};

const $StrictNotEqual: Operator<Rule$StrictNotEqual, boolean> = (rule, data, local) => {
  return apply(rule[1], data, local) !== apply(rule[2], data, local);
};

const $Not: Operator<Rule$Not, boolean> = (rule, data, local) => {
  return !apply(rule[1], data, local);
};

const $DoubleNot: Operator<Rule$DoubleNot, boolean> = (rule, data, local) => {
  return !!apply(rule[1], data, local);
};

const $GraterThan: Operator<Rule$GraterThan, boolean> = (rule, data, local) => {
  return apply(rule[1], data, local) > apply(rule[2], data, local);
};

const $GraterThanOrEqual: Operator<Rule$GraterThanOrEqual, boolean> = (rule, data, local) => {
  return apply(rule[1], data, local) >= apply(rule[2], data, local);
};

const $LessThan: Operator<Rule$LessThan, boolean> = (rule, data, local) => {
  return apply(rule[1], data, local) < apply(rule[2], data, local);
};

const $LessThanOrEqual: Operator<Rule$LessThanOrEqual, boolean> = (rule, data, local) => {
  return apply(rule[1], data, local) <= apply(rule[2], data, local);
};

const $Addition: Operator<Rule$Addition, number> = (rule, data, local) => {
  let value = +apply(rule[1], data, local);
  for (let i = 2; i < rule.length; i++) {
    value = value + +apply(rule[i], data, local);
  }
  return value;
};

const $Multiplication: Operator<Rule$Multiplication, number> = (rule, data, local) => {
  let value = +apply(rule[1], data, local);
  for (let i = 2; i < rule.length; i++) {
    value = value * apply(rule[i], data, local);
  }
  return value;
};

const $Subtraction: Operator<Rule$Subtraction, number> = (rule, data, local) => {
  return apply(rule[1], data, local) - apply(rule[2], data, local);
};

const $Division: Operator<Rule$Division, number> = (rule, data, local) => {
  return apply(rule[1], data, local) / apply(rule[2], data, local);
};

const $Modulo: Operator<Rule$Modulo, number> = (rule, data, local) => {
  return apply(rule[1], data, local) % apply(rule[2], data, local);
};

const $Exponentiation: Operator<Rule$Exponentiation, number> = (rule, data, local) => {
  return apply(rule[1], data, local) ** apply(rule[2], data, local);
};

const $Map: Operator<Rule$Map, any> = (rule, data, local) => {
  const array = apply(rule[1], data, local);
  if (Array.isArray(array)) {
    return array.map(item => apply(rule[2], data, item));
  }
  // ? Throw error
  return undefined;
};

const $Filter: Operator<Rule$Filter, any> = (rule, data, local) => {
  const array = apply(rule[1], data, local);
  if (Array.isArray(array)) {
    return array.filter(item => apply(rule[2], data, item));
  }
  // ? Throw error
  return undefined;
};

const $Every: Operator<Rule$Every, boolean> = (rule, data, local) => {
  const array = apply(rule[1], data, local);
  if (Array.isArray(array)) {
    return array.every(item => apply(rule[2], data, item));
  }
  // ? Throw error
  return false;
};

const $Some: Operator<Rule$Some, boolean> = (rule, data, local) => {
  const array = apply(rule[1], data, local);
  if (Array.isArray(array)) {
    return array.some(item => apply(rule[2], data, item));
  }
  // ? Throw error
  return false;
};

const $Reduce: Operator<Rule$Reduce, any> = (rule, data, local) => {
  const array = apply(rule[1], data, local);
  if (Array.isArray(array)) {
    return array.reduce(item => apply(rule[2], data, item), apply(rule[3], data, local));
  }
  // ? Throw error
  return undefined;
};

const $Typeof: Operator<Rule$Typeof, boolean> = (rule, data, local) => {
  return typeof apply(rule[1], data, local) === apply(rule[2], data, local);
};

const $In: Operator<Rule$In, boolean> = (rule, data, local) => {
  return apply(rule[1], data, local) in apply(rule[2], data, local);
};

const $Method: Operator<Rule$Method, any> = (rule, data, local) => {
  return apply(rule[1], data, local)[apply(rule[2], data, local)](rule.slice(3).map(item => apply(item, data, local)));
};

export function apply(rule: RuleOrValue, data: any, local: any) {
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
