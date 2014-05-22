describe('A fixed table header', function() {
  "use strict";

  var root = window,
      module,
      element;

  beforeEach(function() {
    // Use a large padding bottom to make window scrollable.
    element = $('\
      <div style="padding-bottom: 10000px">\
        <table>\
          <thead>\
          </thead>\
        </table>\
      </div>\
    ');

    module = new GOVUKAdmin.Modules.FixedTableHeader();
  });

  describe('when starting', function() {

    beforeEach(function() {
      module.start(element);
    });

    it('clones the table header and appends to a dummy table', function() {
      expect(element.find('.fixed-table-header-container table thead').length).toBe(1);
      expect(element.find('thead').length).toBe(2);
    });

    it('defaults to hiding the container', function() {
      expect(element.find('.fixed-table-header-container').is(':hidden')).toBe(true);
    });
  });

  describe('when scrolling', function() {
    beforeEach(function() {
      $('body').append(element);
      module.start(element);
    });

    afterEach(function() {
      element.remove();
    });

    it('toggles the table based on the window and table scroll positions', function() {
      shouldHeaderBeHidden(true);
      var headerPosition = element.offset().top;

      scroll(headerPosition - 1); // scroll approaching element
      shouldHeaderBeHidden(true);

      scroll(headerPosition);     // scroll reached element
      shouldHeaderBeHidden(false);

      scroll(headerPosition + 1); // scroll beyond element
      shouldHeaderBeHidden(false);

      scroll(headerPosition - 1); // scoll back, to before element
      shouldHeaderBeHidden(true);

      function shouldHeaderBeHidden(hidden) {
        expect(element.find('.fixed-table-header-container').is(':hidden')).toBe(hidden);
      }

      function scroll(y) {
        window.scrollTo(0, y);
        $(window).trigger('scroll');
      }
    });
  });

});
