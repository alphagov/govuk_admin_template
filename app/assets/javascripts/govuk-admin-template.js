//= require jquery3
//= require bootstrap
//= require govuk-admin-template/govuk-admin
//= require_tree ./govuk-admin-template/modules

// Find and auto-start modules specified using the data-module="" pattern in markup
(function($, GOVUKAdmin) {
  $(function(){
    GOVUKAdmin.startAll();
  });
})(jQuery, window.GOVUKAdmin);
