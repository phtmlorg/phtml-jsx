import phtml from 'phtml';
import getNodesFromJSX from './lib/get-nodes-from-jsx';

export default new phtml.Plugin('phtml-jsx', rawopts => {
	const opts = {
		data: Object(Object(rawopts).data),
		transformOptions: Object(Object(rawopts).transformOptions),
		beforePlugins: [].concat(Object(rawopts).beforePlugins || []),
		plugins: [].concat(Object(rawopts).plugins || [])
	}

	return {
		beforeElement(node) {
			if (node.name === '') {
				const hasData = node.nodes && node.nodes.length;

				if (hasData) {
					// empty the element to prevent its descendants from being parsed
					node.replaceAll();

					const jsxOpts = Object.assign({}, opts, { source: node.source });
					const jsxNodes = getNodesFromJSX(node.sourceOuterHTML, jsxOpts).nodes.slice(0);
					const offsets = getLineNumberOffsets(node);

					updateSourceOffsets(jsxNodes, offsets, node.source);

					node.replaceWith(...jsxNodes);

					return jsxNodes.reduce(
						(childPromise, childNode) => childPromise.then(
							() => childNode.observe()
						),
						Promise.resolve()
					);
				} else {
					node.remove();
				}
			}

			if (node.attrs.contains('jsx')) {
				// empty the element to prevent its descendants from being parsed
				node.replaceAll();

				const jsxOpts = Object.assign({}, opts, { source: node.source });
				const jsxNode = getNodesFromJSX(`<>${node.sourceOuterHTML}</>`, jsxOpts).first;
				const offsets = getLineNumberOffsets(node);

				updateSourceOffsets([jsxNode], offsets, node.source);

				jsxNode.attrs.remove('jsx');

				node.replaceWith(jsxNode);

				return jsxNode.observe();
			}
		}
	};
});

function getLineNumberOffsets(node) {
	const inputHTML = node.source.input.html.slice(node.source.startOffset, node.source.endOffset);
	const lbre = /\n/g;
	const offsets = [];

	while (lbre.exec(inputHTML)) {
		offsets.push(lbre.lastIndex);
	}

	return offsets;
}

function updateSourceOffsets(jsxNodes, lineNumberOffsets, nodeSource) {
	jsxNodes.forEach(jsxNode => {
		const offset = lineNumberOffsets[jsxNode.source.lineNumber];

		jsxNode.source = Object.assign({}, nodeSource, {
			startOffset: offset,
			startInnerOffset: offset,
			endInnerOffset: offset,
			endOffset: offset
		});

		if (jsxNode.nodes && jsxNode.nodes.length) {
			updateSourceOffsets(jsxNode.nodes, lineNumberOffsets, nodeSource);
		}
	});
}
