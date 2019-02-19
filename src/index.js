import phtml from 'phtml';
import exec from './lib/exec';

export default new phtml.Plugin('phtml-jsx', opts => {
	const data = Object(Object(opts).data);

	return {
		Element(node) {
			if (node.name === '') {
				const hasData = node.nodes && node.nodes.length;

				if (hasData) {
					const results = exec(node.sourceOuterHTML, { data }).nodes;

					node.replaceWith(...results);
				} else {
					node.remove();
				}
			}

			if (node.attrs.contains('jsx')) {
				const result = exec(`<>${node.sourceOuterHTML}</>`, { data }).first;

				result.attrs.remove('jsx');

				node.replaceWith(result);
			}
		}
	};
});
