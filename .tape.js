module.exports = {
	'basic': {
		message: 'supports basic usage'
	},
	'basic:opts': {
		message: 'supports { transformOptions, beforePlugins, plugins } usage',
		options: {
			transformOptions: {},
			beforePlugins: [],
			plugins: []
		}
	},
	'data': {
		message: 'supports { data } usage',
		options: {
			data: {
				dir: 'ltr',
				className: 'foo',
				place: 'World'
			}
		},
		expect: 'basic.expect.html'
	},
	'attr': {
		message: 'supports { data } with jsx attribute usage',
		options: {
			data: {
				dir: 'ltr',
				className: 'foo',
				place: 'World'
			}
		},
		expect: 'basic.expect.html'
	}
};
