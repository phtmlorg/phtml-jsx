import { Element, Fragment, Node, Text } from 'phtml';

export function __pragma(name, props, ...children) {
	const options = 'root' in Object(this) ? { result: this } : {};

	options.nodes = __children.bind(this)(children);

	if (name === __pragmaFrag) {
		return new Fragment(options);
	}

	const attrs = __props(props);

	return new Element({ ...options, name, attrs, source: props.__source });
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
	const options = 'root' in Object(this) ? { result: this } : {};

	return children.reduce(
		(array, child) => {
			if (Array.isArray(child)) {
				array.push(...__children.bind(this)(child));
			} else if (child instanceof Node) {
				array.push(child);
			} else {
				array.push(new Text({ ...options, data: String(child) }))
			}

			return array;
		},
		[]
	);
}
