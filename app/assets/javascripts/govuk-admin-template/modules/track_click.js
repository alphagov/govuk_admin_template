(function(Modules) {
  "use strict";

  Modules.TrackClick = function() {
    var that = this;

    that.start = function(container) {
      var trackClick = function() {
        var category = container.data("track-category"),
            action = container.data("track-action") || "button-pressed",
            label = $(this).data("track-label") || $(this).text();

        GOVUKAdmin.trackEvent(category, action, { label: label });
      };

      container.on("click", ".js-track", trackClick);
    }
  };

})(window.GOVUKAdmin.Modules);
