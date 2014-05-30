(function(Modules) {
  "use strict";

  Modules.FixedTableHeader = function() {
    var that = this;
    that.start = function(element) {

      // Clone the current table header into a fixed container
      // Use .container class for correct width and responsiveness
      // Setup a dummy table for correct rendering of cloned <thead>
      // Basics derived from http://stackoverflow.com/questions/4709390/

      var header = element.find('thead'),
          headerOffset = header.offset().top,
          fixedHeader = header.clone(),
          fixedHeaderContainer = $('\
          <div class="fixed-table-header-container">\
            <div class="container">\
              <table class="table table-bordered">\
              </table>\
            </div>\
          </div>');

      fixedHeaderContainer.hide().find('table').append(fixedHeader);
      element.prepend(fixedHeaderContainer);
      $(window).bind("scroll", checkOffsetAndToggleFixedHeader);

      function checkOffsetAndToggleFixedHeader() {
        var offset = $(window).scrollTop();
        if (offset >= headerOffset && fixedHeaderContainer.is(":hidden")) {
          fixedHeaderContainer.show();
        } else if (offset < headerOffset) {
          fixedHeaderContainer.hide();
        }
      }
    }
  };
})(window.GOVUKAdmin.Modules);
