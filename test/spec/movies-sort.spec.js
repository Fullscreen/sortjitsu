'use strict';

jasmine.getFixtures().fixturesPath = "base/test/fixtures";

describe('jquery.sortjitsu test suite', function () {
  var $sj;

  beforeEach(function () {
    loadFixtures('movies-sort.html');
  });

  afterEach(function () {
    $sj = undefined;
  })

  it('should sort nodes alphabetically', function () {
    // HACK (marcus): the following line of code is needed to mock search query params with phantom js
    // http://stackoverflow.com/questions/2494213/changing-window-location-without-triggering-refresh
    window.history.replaceState( {}, '', 'http://localhost:8080/context.html?sort=title');

    $sj = $.fn.sortjitsu();
    var titles = $('.sortjitsu-wrapper [data-sortable] [data-title]').toArray();

    // convert array of nodes to an array of movie titles
    titles = titles.map(function(x) {
      return $(x).text();
    });

    expect(titles).toEqual([
      'Airbud (2017)',
      'Batman (2017)',
      'Chicken Run (2017)',
      'Dawn of the Dead (2017)',
      'Endless Summer (2017)',
      'Finding Dory (2017)',
      'G.I. Joe (2017)',
      'Her (2017)',
      'Independence Day (2017)',
      'Jay and Silent Bob (2017)',
    ])
  });

  it('should sort nodes reverse alphabetically', function () {
    // HACK (marcus): the following line of code is needed to mock search query params with phantom js
    // http://stackoverflow.com/questions/2494213/changing-window-location-without-triggering-refresh
    window.history.replaceState( {}, '', 'http://localhost:8080/context.html?sort=-title');

    $sj = $.fn.sortjitsu();
    var titles = $('.sortjitsu-wrapper [data-sortable] [data-title]').toArray();

    // convert array of nodes to an array of movie titles
    titles = titles.map(function(x) {
      return $(x).text();
    });

    expect(titles).toEqual([
      'Jay and Silent Bob (2017)',
      'Independence Day (2017)',
      'Her (2017)',
      'G.I. Joe (2017)',
      'Finding Dory (2017)',
      'Endless Summer (2017)',
      'Dawn of the Dead (2017)',
      'Chicken Run (2017)',
      'Batman (2017)',
      'Airbud (2017)'
    ])
  });

  it('should not sort when `sort` is not a key', function () {
    // HACK (marcus): the following line of code is needed to mock search query params with phantom js
    // http://stackoverflow.com/questions/2494213/changing-window-location-without-triggering-refresh
    window.history.replaceState( {}, '', 'http://localhost:8080/context.html?filter=do_not_sort');

    $sj = $.fn.sortjitsu();
    var titles = $('.sortjitsu-wrapper [data-sortable] [data-title]').toArray();

    // convert array of nodes to an array of movie titles
    titles = titles.map(function(x) {
      return $(x).text();
    });

    expect(titles).toEqual([
      'Chicken Run (2017)',
      'Jay and Silent Bob (2017)',
      'Dawn of the Dead (2017)',
      'Batman (2017)', 'Airbud (2017)',
      'G.I. Joe (2017)',
      'Finding Dory (2017)',
      'Endless Summer (2017)',
      'Independence Day (2017)',
      'Her (2017)'
    ]);
  });
});


// test when no search query params (fail gracefully)

