import transform from './transform';
import { __pragma, __pragmaFrag } from './pragma';

export default (source, options) => {
	// options
	const defaultOpts = {};
	const opts = Object.assign({}, defaultOpts, options);

	const defaultData = { __pragma, __pragmaFrag };

	// global options
	const fnData = Object.assign({}, defaultData, opts.data);

	// array of parameters for the ESLit function
	const fnPrms = Object.keys(fnData);

	// array of arguments for the ESLit function
	const fnArgs = fnPrms.map(key => fnData[key]);

	// function body from source
	const body = transform(source);

	// ESLit class bound to the array of parameters
	const FnClass = Function.prototype.bind.call(Function, null, ...fnPrms);

	// ESLit function instance using the function body
	const fnFunc = new FnClass(body);

	// executed ESLit instance
	const result = fnFunc(...fnArgs);

	return result;
}
