/*
 * Retsly PhotoTile Component
 * Requires Retsly SDK (Full hosted SDK including _, $, BB)
 * TODO: Need to be able to pass in a listing model
 * TODO: Need to make this layout responsive !!!
 */

module.exports = exports = function (retsly) {

  var Component = {};
  Component.Basic = Backbone.View.extend({
    index: 0,
    className: 'retsly-component retsly-js-phototile span12 row-fluid defer',
    initialize: function(options) {

      if(!options || typeof options.mls_id === "undefined")
        throw new Error('Retsly.Views.PhotoTile requires a mls_id: `{mls_id: mls.id}`');

      if(!options || typeof options.listing_id === "undefined")
        throw new Error('Retsly.Views.PhotoTile requires a listing_id: `{listing_id: listing.id}`');

      if(typeof options == "undefined" || !options.target)
        throw new Error('Retsly.Views.PhotoTile is a subview and must have a target: `{target:this}`');

      this.options = _.extend({ mls_id: null, listing_id: null }, options);
      options.target = (typeof options.target.$el !== "undefined") ? options.target.$el : $(options.target)

      $(options.target).append(this.$el);

      var self = this;
      new Retsly.Models.Listing({ _id: this.options.listing_id }, {
        mls_id: this.options.mls_id,
        complete: function(listing) { self.render(listing); }
      }).fetch({ limit: 1 });

    },
    render: function(listing) {
      var html = require('./templates/template');
      var template = _.template(html);
      this.$el.html( template( listing.toJSON() ));

      var self = this;
      this.$el.find('li:first')
        .css({ 'position': 'relative'})
        .find('img').on('load', function() {

          self.$el.find('li:first').animate({ 'opacity': 1 });
          self.$el.find('img')
            .css('width', self.$el.width()+'px');

          setTimeout(function() {
            setInterval(function() {
              self.cycle.apply(self);
            }, 5000);
          }, 0);

      });

      $(window).on('resize', function() {
        self.$el.find('img')
          .css('width', self.$el.width()+'px');
      });
    },
    cycle: function() {

      var photos = this.$el.find('li');

      this.last_index = this.index;
      this.index = (this.index < photos.length-1 || !this.index) ? this.index+1 : 0;

      var pin = photos.get(this.index);
      $(pin).css({ 'z-index': 1}).animate({ 'opacity': 1 });

      // Don't run the cross fade on first load.
      if(this.$el.hasClass('defer')) return this.$el.removeClass('defer');

      var pout = photos.get(this.last_index);
      $(pout).css({ 'z-index': 0 }).animate({'opacity': 0});

    }
  });

  return Component;
}
