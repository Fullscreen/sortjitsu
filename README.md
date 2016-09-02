# jquery.sortjitsu.js

Sortjitsu is a jQuery plugin to sort DOM elements based on search query params in the URL. It sorts simply by data attributes, making few assumptions on the structure of your DOM.

There are many ways to sort data on the backend before serving it to the client. Sortjitsu is specifically meant to be used on cached HTML pages served from a CDN, relieving sorting from the backend and allowing for fast page loads.

[![Build Status](https://travis-ci.org/Fullscreen/sortjitsu.svg?branch=master)](https://travis-ci.org/Fullscreen/sortjitsu)

[View contributors](https://github.com/Fullscreen/sortjitsu/graphs/contributors)

## Demo
[https://fullscreen.github.io/sortjitsu/](https://fullscreen.github.io/sortjitsu/)

or

```shell
 $ python -m SimpleHTTPServer 3000
```
Navigate to [http://localhost:3000](http://localhost:3000)

## How to use
The sortjitsu plugin is initialized by being called off of jQuery.fn (or $.fn). The plugin
accepts an options object which will override the defaults defined within the plugin.

Sortjitsu assumes a few things about the HTML and the URL structure on the page which it is
initialized. The `DATA_SORTABLE` selector is required on an element that wraps the main content
which will be sorted. From there the data fields must match the value after `?sort=` in the url
to be sorted.

Below is an example of how sortjitsu could be structured in HTML and initialized in javascript.
```html
  <!-- links to change url and cause sorting -->
  <a href="./">Clear search query params</a>
  <a href="?sort=name">Sort by name</a>
  <a href="?sort=-name">Sort by name reversed</a>
  <a href="?sort=count">Sort by count</a>
  <a href="?sort=-count">Sort by count reversed</a>
  <!-- items to be sorted -->
  <div>
    <div data-sortable><div data-name="D" data-count="7">D 7</div></div>
    <div data-sortable><div data-name="C" data-count="5">C 5</div></div>
    <div data-sortable><div data-name="J" data-count="9">J 9</div></div>
    <div data-sortable><div data-name="E" data-count="6">E 6</div></div>
    <div data-sortable><div data-name="F" data-count="1">F 1</div></div>
    <div data-sortable><div data-name="G" data-count="4">G 4</div></div>
    <div data-sortable><div data-name="A" data-count="8">A 8</div></div>
    <div data-sortable><div data-name="H" data-count="2">H 2</div></div>
    <div data-sortable><div data-name="B" data-count="3">B 3</div></div>
    <div data-sortable><div data-name="I" data-count="10">I 10</div></div>
  </div>
  <!-- sortjitsu plugin -->
  <script>
    $.fn.sortjitsu({
      // plugin options here
    });
  </script>
```

## Plugin Options
```js
  Sortjitsu.defaults = {
    /**
     * jQuery selector for all sortable elements
     * @type {String}
     */
    DATA_SORTABLE: '[data-sortable]'
  };
```

## Development
The development file lives under `src/jquery.sortjitsu.js`. To develop, first run `npm install` to
install the devDependencies.
```shell
 $ npm install
 $ ./node_modules/.bin/gulp
 ... edit jquery.sortjitsu.js
 ... look in terminal for gulp output as you save
 $ python -m SimpleHTTPServer 3000
 ... test in [browser](http://localhost:3000)
```

## Testing with Karma + Jasmine-jQuery
The test files live under the `test` directory. Karma is used as the test runner and
[jasmine](http://jasmine.github.io/) + [jasmine-jquery](https://github.com/velesin/jasmine-jquery)
is the bdd framework.

Each test should have its own spec file and a matching fixtures html template. Tests should be
concise. Limit the number of `expect()`s per `it()` block, this allows for clear test failure
messages. Each `it()` block should have a clear title and describe exactly what is expected.

Execute the tests using gulp.
```shell
 $ ./node_modules/.bin/gulp test
```

## Versioning
Versions will follow the [semver](http://semver.org/) format. All versions will be visible under
[releases](https://github.com/Fullscreen/sortjitsu/releases) with an
[updated changelog](https://github.com/Fullscreen/sortjitsu/blob/master/CHANGELOG.md).
