'use strict';

jasmine.getFixtures().fixturesPath = "base/test/fixtures";

describe('jquery.sortjitsu numeric test suite', function () {
  var $sj;

  beforeEach(function () {
    loadFixtures('numeric-sort.html');

    // HACK (marcus): the following line of code is needed to mock search query params with phantom js
    // http://stackoverflow.com/questions/2494213/changing-window-location-without-triggering-refresh
    window.history.replaceState( {}, '', 'http://localhost:8080/context.html?sort=view-count');

    $sj = $.fn.sortjitsu();
  });

  afterEach(function () {
    $sj = undefined;
  })

  it('should sort nodes alphabetically', function () {
    var viewCount = $('.sortjitsu-wrapper [data-sortable] [data-view-count]').toArray();

    // convert array of nodes to an array of view counts
    viewCount = viewCount.map(function(x) {
      return $(x).text();
    });

    expect(viewCount).toEqual(['1M', '2M', '3M', '4M', '5M', '6M', '7M', '8M', '9M', '10M'])
  });
});
