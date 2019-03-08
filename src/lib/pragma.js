import { Element, Fragment, Node, Text } from 'phtml';

export function __pragma(name, props, ...children) {
	const nodes = __children(children);

	if (name === __pragmaFrag) {
		const $fragment = new Fragment();

		$fragment.append(...nodes);

		return $fragment;
	}

	const attrs = __props(props);

	return new Element({ name, attrs, nodes, source: props.__source });
}

export function __pragmaFrag() {}

function __props(props) {
	const attrs = [];

	for (const prop in props) {
		const isEvent = /^on/.test(prop);
		const isSource = /^__source/.test(prop);

		if (!isEvent && !isSource) {
			attrs.push({ name: prop, value: String(props[prop]) });
		}
	}

	return attrs;
}

function __children(children) {
	return children.reduce(
		(array, child) => {
			if (Array.isArray(child)) {
				array.push(...__children(child));
			} else if (child instanceof Node) {
				array.push(child);
			} else {
				array.push(new Text({ data: String(child) }))
			}

			return array;
		},
		[]
	);
}
