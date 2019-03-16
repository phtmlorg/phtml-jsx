import transform from './transform';
import { __pragma, __pragmaFrag } from './pragma';

export default function getNodesFromJSX (source, opts, result) {
	// global options
	const fnData = Object.assign({ __pragma: __pragma.bind(result), __pragmaFrag }, opts.data);

	// array of parameters for the ESLit function
	const fnPrms = Object.keys(fnData);

	// array of arguments for the ESLit function
	const fnArgs = fnPrms.map(key => fnData[key]);

	// function body from source
	const body = transform(source, opts);

	// ESLit class bound to the array of parameters
	const fnFunc = Function.prototype.bind.call(Function, null, ...fnPrms)(body);

	// executed ESLit instance
	return fnFunc.apply(fnFunc, fnArgs);
}
