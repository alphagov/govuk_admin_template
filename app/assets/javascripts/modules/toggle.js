(function(Modules) {
  "use strict";

  Modules.Toggle = function() {

    var that = this;

    that.start = function(element) {
      element.on('click', '.js-toggle', toggle);
      element.on('click', '.js-cancel', cancel);

      function toggle(event) {
        element.find('.js-toggle-target').toggleClass('if-js-hide');
        element.find('input').first().focus();
        event.preventDefault();
      }

      function cancel(event) {
        toggle(event);
        element.find('input').first().val('');
      }
    };
  };

})(window.GOVUKAdmin.Modules);
