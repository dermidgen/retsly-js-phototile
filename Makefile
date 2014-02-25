
build: clean components template
	@component build --dev

components: component.json
	@component install --dev

template:
	@component convert templates/template.html

dist: component.json template
	component install
	component build

test: build
	@mocha-phantomjs test/test.html

clean:
	rm -fr build components templates/template.js

.PHONY: clean test
