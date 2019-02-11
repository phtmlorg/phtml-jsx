import babel from '@babel/core';
import babelPluginProposalObjectRestSpread from '@babel/plugin-proposal-object-rest-spread';
import babelPluginTransformReactJSX from '@babel/plugin-transform-react-jsx';

const defaultOpts = {
	pragma: '__pragma',
	pragmaFrag: '__pragmaFrag'
};

export default function transform(source, options) {
	const body = `!function(){"use strict";return<>${source}</>}`;
	const opts = Object.assign({}, defaultOpts, options);
	const transformOpts = Object.assign({}, opts.transformOpts, {
		plugins: [
			...Array.from(opts.firstPlugins || []),
			[babelPluginProposalObjectRestSpread],
			[babelPluginTransformReactJSX, {
				pragma: opts.pragma,
				pragmaFrag: opts.pragmaFrag,
				throwIfNamespace: false,
				useBuiltIns: true
			}],
			...Array.from(opts.plugins || [])
		]
	});

	return babel.transformSync(body, transformOpts).code.slice(14, -2);
}
