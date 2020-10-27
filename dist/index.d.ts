declare type JL$ = ['$', ...JLorValue[]];
declare type JL$And = ['$&&', ...JLorValue[]];
declare type JL$Or = ['$||', ...JLorValue[]];
declare type JL$Equal = ['$==', JLorValue, JLorValue];
declare type JL$StrictEqual = ['$===', JLorValue, JLorValue];
declare type JL$NotEqual = ['$!=', JLorValue, JLorValue];
declare type JL$StrictNotEqual = ['$!==', JLorValue, JLorValue];
declare type JL$Not = ['$!', JLorValue];
declare type JL$DoubleNot = ['$!!', JLorValue];
declare type JL$GraterThan = ['$>', JLorValue, JLorValue];
declare type JL$GraterThanOrEqual = ['$>=', JLorValue, JLorValue];
declare type JL$LessThan = ['$<', JLorValue, JLorValue];
declare type JL$LessThanOrEqual = ['$<=', JLorValue, JLorValue];
declare type JL = JL$ | JL$And | JL$Or | JL$Equal | JL$StrictEqual | JL$NotEqual | JL$StrictNotEqual | JL$Not | JL$DoubleNot | JL$GraterThan | JL$GraterThanOrEqual | JL$LessThan | JL$LessThanOrEqual;
declare type JLorValue = string | number | JL;
export declare function apply(logic: JLorValue, data: any): any;
export {};