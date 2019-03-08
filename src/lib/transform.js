import babel from '@babel/core';
import babelPluginProposalObjectRestSpread from '@babel/plugin-proposal-object-rest-spread';
import babelPluginTransformReactJSX from '@babel/plugin-transform-react-jsx';
import babelPluginTransformReactJSXSource from '@babel/plugin-transform-react-jsx-source';

const pragmaOpts = {
	pragma: '__pragma',
	pragmaFrag: '__pragmaFrag'
};

export default function transform(source, opts) {
	const body = `!function(){"use strict";return (${source})}`;
	const transformOptions = Object.assign({}, opts.transformOptions, {
		plugins: [
			...opts.beforePlugins,
			[babelPluginProposalObjectRestSpread],
			[babelPluginTransformReactJSX, {
				pragma: pragmaOpts.pragma,
				pragmaFrag: pragmaOpts.pragmaFrag,
				throwIfNamespace: false,
				useBuiltIns: true
			}],
			[babelPluginTransformReactJSXSource],
			...opts.plugins
		],
		filename: opts.source.input.from
	});

	return updateJSXSourceCode(babel.transformSync(body, transformOptions).code);
}

function updateJSXSourceCode(code) {
	return code.replace(/^(var\s*_jsxFileName\s*=\s*"[^"]+";)?\s*!function\s*\(\)\s*{\s*"use strict";\s*|\s*\};\s*$/g, '$1');
}
