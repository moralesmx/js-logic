
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

type Rule$In = ['$in', RuleOrValue, RuleOrValue];
type Rule$Typeof = ['$typeof', RuleOrValue];

type Rule$Method = ['$()', RuleOrValue, RuleOrValue, ...RuleOrValue[]];

type Rule$Arrow = ['$=>', RuleOrValue];

type Rule$Array = ['$[]', ...RuleOrValue[]];

type Rule$Undefined = ['$undefined'];

type Rule =
  | Rule$
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
  | Rule$In
  | Rule$Typeof
  | Rule$Method
  | Rule$Arrow
  | Rule$Array
  | Rule$Undefined
  ;

type RuleOrValue = string | number | Rule;

type Operator<Rule, Returns> = (rule: Rule, data: any, args: any[]) => Returns;

function isRule(rule: RuleOrValue): rule is Rule {
  return Array.isArray(rule) && typeof rule[0] === 'string' && rule[0].startsWith('$');
}

const $: Operator<Rule$, any> = (rule, data, args) => {
  let value = data;
  for (let i = 1; i < rule.length; i++) {
    if (value) {
      value = value[apply(rule[i], data, args)];
    } else {
      break;
    }
  }
  return value;
};

const $$: Operator<Rule$$, any> = (rule, data, args) => {
  let value = args;
  for (let i = 1; i < rule.length; i++) {
    if (value) {
      value = value[apply(rule[i], data, args)];
    } else {
      break;
    }
  }
  return value;
};

const $And: Operator<Rule$And, any> = (rule, data, args) => {
  let value = apply(rule[1], data, args);
  for (let i = 2; i < rule.length; i++) {
    value = value && apply(rule[i], data, args);
  }
  return value;
};

const $Or: Operator<Rule$Or, any> = (rule, data, args) => {
  let value = apply(rule[1], data, args);
  for (let i = 2; i < rule.length; i++) {
    value = value || apply(rule[i], data, args);
  }
  return value;
};

const $Equal: Operator<Rule$Equal, boolean> = (rule, data, args) => {
  return apply(rule[1], data, args) == apply(rule[2], data, args);
};

const $StrictEqual: Operator<Rule$StrictEqual, boolean> = (rule, data, args) => {
  return apply(rule[1], data, args) === apply(rule[2], data, args);
};

const $NotEqual: Operator<Rule$NotEqual, boolean> = (rule, data, args) => {
  return apply(rule[1], data, args) != apply(rule[2], data, args);
};

const $StrictNotEqual: Operator<Rule$StrictNotEqual, boolean> = (rule, data, args) => {
  return apply(rule[1], data, args) !== apply(rule[2], data, args);
};

const $Not: Operator<Rule$Not, boolean> = (rule, data, args) => {
  return !apply(rule[1], data, args);
};

const $DoubleNot: Operator<Rule$DoubleNot, boolean> = (rule, data, args) => {
  return !!apply(rule[1], data, args);
};

const $GraterThan: Operator<Rule$GraterThan, boolean> = (rule, data, args) => {
  return apply(rule[1], data, args) > apply(rule[2], data, args);
};

const $GraterThanOrEqual: Operator<Rule$GraterThanOrEqual, boolean> = (rule, data, args) => {
  return apply(rule[1], data, args) >= apply(rule[2], data, args);
};

const $LessThan: Operator<Rule$LessThan, boolean> = (rule, data, args) => {
  return apply(rule[1], data, args) < apply(rule[2], data, args);
};

const $LessThanOrEqual: Operator<Rule$LessThanOrEqual, boolean> = (rule, data, args) => {
  return apply(rule[1], data, args) <= apply(rule[2], data, args);
};

const $Addition: Operator<Rule$Addition, number> = (rule, data, args) => {
  let value = +apply(rule[1], data, args);
  for (let i = 2; i < rule.length; i++) {
    value = value + +apply(rule[i], data, args);
  }
  return value;
};

const $Multiplication: Operator<Rule$Multiplication, number> = (rule, data, args) => {
  let value = +apply(rule[1], data, args);
  for (let i = 2; i < rule.length; i++) {
    value = value * +apply(rule[i], data, args);
  }
  return value;
};

const $Subtraction: Operator<Rule$Subtraction, number> = (rule, data, args) => {
  return apply(rule[1], data, args) - apply(rule[2], data, args);
};

const $Division: Operator<Rule$Division, number> = (rule, data, args) => {
  return apply(rule[1], data, args) / apply(rule[2], data, args);
};

const $Modulo: Operator<Rule$Modulo, number> = (rule, data, args) => {
  return apply(rule[1], data, args) % apply(rule[2], data, args);
};

const $Exponentiation: Operator<Rule$Exponentiation, number> = (rule, data, args) => {
  return apply(rule[1], data, args) ** apply(rule[2], data, args);
};

const $In: Operator<Rule$In, boolean> = (rule, data, args) => {
  return apply(rule[1], data, args) in apply(rule[2], data, args);
};

const $Typeof: Operator<Rule$Typeof, any> = (rule, data, args) => {
  return typeof apply(rule[1], data, args);
};

const $Method: Operator<Rule$Method, any> = (rule, data, args) => {
  return apply(rule[1], data, args)[apply(rule[2], data, args)](...rule.slice(3).map(item => apply(item, data, args)));
};

const $Arrow: Operator<Rule$Arrow, any> = (rule, data, args) => {
  return (...args: any[]) => apply(rule[1], data, args);
};

const $Array: Operator<Rule$Array, any> = (rule, data, args) => {
  return rule.slice(1).map(item => apply(item, data, args));
};

const $Undefined: Operator<Rule$Undefined, any> = (rule, data, args) => {
  return undefined;
};

export const apply: Operator<RuleOrValue, any> = (rule, data, args) => {
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
