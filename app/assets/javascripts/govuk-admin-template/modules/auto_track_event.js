(function(Modules) {
  "use strict";

  Modules.AutoTrackEvent = function() {
    var that = this;
    that.start = function(element) {
      var category = element.data('track-category'),
          action = element.data('track-action'),
          label = element.data('track-label'),
          value = element.data('track-value');

      GOVUKAdmin.trackEvent(category, action, { label: label, value: value });
    }
  };

})(window.GOVUKAdmin.Modules);
