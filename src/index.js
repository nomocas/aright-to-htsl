import htmlLexicon from 'htsl-lexicon';

const arightHTML = htmlLexicon.createDialect('html:aright');

arightHTML
	.addCompunds((h) => {
		return {
			is(type) {
				return this.div(
					h.class('aright-is')
					.text(`is ${ type }`)
				);
			},
			has(name, type, babelute) {
				return this.div(
					h.class('aright-property')
					.text(`property ${ name } of type ${ type } ${ babelute ? " as : " : "" }`),
					babelute
				);
			},
			or(...rules) {
				return this.div(
					h.class('aright-or')
					.text('or : ')
					.each(rules, (rule) => h._use(rule))
				);
			},
			not(babelute) {
				return this.div(
					h.class('aright-not')
					.text('not : '),
					babelute
				);
			},
			switch (name, map) {
				const keys = Object.keys(map);
				return this.div(
					h.class('aright-switch')
					.text(`switch( ${ name } )`)
					.each(keys, (key) => {
						return h.div(
							h.class('aright-switch-rule'),
							`key : ${ map[key] }`
						);
					})
				);
			},
			item( /* max */ ) {},
			array( /* max */ ) {}
		};
	})
	.addCompounds((h) => {
		const methods = {};
		[
			'required',
			'minLength',
			'maxLength',
			'minimum',
			'maximum',
			'format',
			'enum',
			'equal',
			'instanceOf',
			'isArray',
			'null'
		]
		.forEach((check) => {
			methods[check] = function(value) {
				return this.div(
					h.class('aright-check'),
					`${ check } : ${ value }`
				);
			};
		});
		return methods;
	});

export default arightHTML;

