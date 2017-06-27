module.exports = {
	build: `tsc`,
	'build:publish': [
		`@clean`,
		`tsc -p tsconfig.publish.json`
	],
	clean: `rm -rf lib $(find src -name '*.js' -o -name '*.d.ts')`
};