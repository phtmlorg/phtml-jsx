import transform from './transform';
import { __pragma, __pragmaFrag } from './pragma';

export default (source, opts) => {
	// global options
	const fnData = Object.assign({ __pragma, __pragmaFrag }, opts.data);

	// array of parameters for the ESLit function
	const fnPrms = Object.keys(fnData);

	// array of arguments for the ESLit function
	const fnArgs = fnPrms.map(key => fnData[key]);

	// function body from source
	const body = transform(source, opts);

	// ESLit class bound to the array of parameters
	const fnFunc = Function.prototype.bind.call(Function, null, ...fnPrms)(body);

	// executed ESLit instance
	const result = fnFunc.apply(fnFunc, fnArgs);

	return result;
}
