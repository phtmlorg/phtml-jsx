import { Element, Fragment, Text } from 'phtml';

export function __pragma(name, props, ...children) {
	const nodes = __children(children);

	if (name === __pragmaFrag) {
		const $fragment = new Fragment();

		$fragment.append(...nodes);

		return $fragment;
	}

	const attrs = __props(props);

	const $element = new Element({ name, attrs });

	$element.append(...nodes);

	return $element;
}

export function __pragmaFrag() {}

function __props(props) {
	const attrs = [];

	for (const prop in props) {
		const isEvent = /^on/.test(prop);

		if (!isEvent) {
			attrs.push({ name: prop, value: props[prop] });
		}
	}

	return attrs;
}

function __children(children) {
	return children.map(
		child => typeof child === 'string'
			? new Text({ data: child })
		: child
	);
}
