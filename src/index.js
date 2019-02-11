import phtml from 'phtml';
import exec from './lib/exec';

export default new phtml.Plugin('phtml-jsx', opts => {
	const data = Object(Object(opts).data);

	return root => {
		root.walk(node => {
			const isNodeJSX = node.type === 'element' && node.name === '';

			if (isNodeJSX) {
				const hasData = node.nodes && node.nodes.length;

				if (hasData) {
					const result = exec(node.sourceInnerHTML, { data });

					node.replaceWith(result);
				} else {
					node.remove();
				}
			}
		});
	};
});
