(function(Modules) {
  "use strict";

  Modules.TrackClick = function() {
    var that = this;

    that.start = function(container) {
      var trackClick = function() {
        var action = container.data("track-action") || "button-pressed",
            label = $(this).data("track-label") || $(this).text(),
            value = $(this).data('track-value'),
            category = container.data('track-category');

        GOVUKAdmin.trackEvent(action, label, value, category);
      };

      container.on("click", ".js-track", trackClick);
    }
  };

})(window.GOVUKAdmin.Modules);
