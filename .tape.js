module.exports = {
	'basic': {
		message: 'supports basic usage'
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
	}
};
