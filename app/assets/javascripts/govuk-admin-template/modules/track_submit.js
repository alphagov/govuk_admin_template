(function(Modules) {
  "use strict";

  Modules.TrackSubmit = function() {
    var that = this;

    that.start = function(container) {
      var action = container.data('track-action'),
        label = container.data('track-label'),
        value = container.data('track-value'),
        category = container.data('track-category');

      var trackSubmit = function() {
        GOVUKAdmin.trackEvent(action, label, value, category);
      };

      container.on("submit", trackSubmit);
    }
  };

})(window.GOVUKAdmin.Modules);
