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
		Element (node, result) {
			if (node.name === '') {
				const { constructor: NodeList } = node.nodes;
				const hasData = node.nodes && node.nodes.length;

				if (hasData) {
					// empty the element to prevent its descendants from being parsed
					node.replaceAll();

					const jsxOpts = Object.assign({}, opts, { source: node.source });
					const jsxNodes = NodeList.from(getNodesFromJSX(node.sourceOuterHTML, jsxOpts, result).nodes).slice(0);

					updateSourceOffsets(jsxNodes, node);

					node.replaceWith(...jsxNodes);

					return jsxNodes.reduce(
						(childPromise, childNode) => childPromise.then(
							() => childNode.visit(result)
						),
						Promise.resolve()
					);
				} else {
					node.remove();
				}
			}

			if (node.attrs.contains('jsx')) {
				const { constructor: NodeList } = node.nodes;

				// empty the element to prevent its descendants from being parsed
				node.replaceAll();

				const jsxOpts = Object.assign({}, opts, { source: node.source });
				const jsxNode = NodeList.from(getNodesFromJSX(`<>${node.sourceOuterHTML}</>`, jsxOpts, result).nodes)[0];

				updateSourceOffsets([jsxNode], node);

				jsxNode.attrs.remove('jsx');

				node.replaceWith(jsxNode);

				return jsxNode.visit(result);
			}
		}
	};
});

function getLineNumberOffsets(node) {
	const lbre = /(?:\n|\r\n?)/g;
	const offsets = [0];

	while (lbre.exec(node.sourceOuterHTML)) {
		offsets.push(lbre.lastIndex);
	}

	return offsets;
}

function updateSourceOffsets(jsxNodes, nodeSource) {
	const lineNumberOffsets = getLineNumberOffsets(nodeSource);

	jsxNodes.forEach(jsxNode => {
		const sourceNode = 'lineNumber' in jsxNode.source ? jsxNode : jsxNode.parent;

		if ('lineNumber' in sourceNode.source) {
			const lineNumber = sourceNode.source.lineNumber - 1;
			const lines = nodeSource.sourceOuterHTML.split(/(?:\n|\r\n?)/);
			const line = lines[lineNumber];
			const columnOffset = line.match(/^\s*/)[0].length;
			const startOffset = nodeSource.source.startOffset + lineNumberOffsets[lineNumber] + columnOffset;

			jsxNode.source = Object.assign({}, nodeSource.source, {
				startOffset: startOffset,
				startInnerOffset: startOffset,
				endInnerOffset: startOffset,
				endOffset: startOffset,
				lineNumber: sourceNode.source.lineNumber
			});

			if (jsxNode.nodes && jsxNode.nodes.length) {
				updateSourceOffsets(jsxNode.nodes, nodeSource);
			}
		}
	});
}
