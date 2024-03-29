
/**
 * Dependencies
 */
var Retsly = require('retsly-backbone');
var Backbone = require('backbone');
var _ = require('underscore');
var $ = require('jquery');

/*
 * Retsly PhotoTile Component
 * Requires Retsly SDK (Full hosted SDK including _, $, BB)
 * TODO: Need to be able to pass in a listing model
 * TODO: Need to make this layout responsive !!!
 */

var Component = module.exports = {};

Component.Basic = Backbone.View.extend({
  index: 0,
  className: 'retsly-component retsly-js-phototile span12 row-fluid defer',
  initialize: function(options) {

    if(!options || typeof options.vendorID === "undefined")
      throw new Error('Retsly.Views.PhotoTile requires a vendorID: `{vendorID: \'id\'}`');

    if(!options || typeof options.listingID === "undefined")
      throw new Error('Retsly.Views.PhotoTile requires a listingID: `{listingID: listing.id}`');

    if(typeof options == "undefined" || !options.target)
      throw new Error('Retsly.Views.PhotoTile is a subview and must have a target: `{target:this}`');

    this.options = _.extend({ vendorID: null, listingID: null }, options);
    options.target = (typeof options.target.$el !== "undefined") ? options.target.$el : $(options.target)

    $(options.target).append(this.$el);

    var self = this;
    new Retsly.Models.Listing(
      { _id: this.options.listingID },
      { vendorID: this.options.vendorID }
    )
    .fetch({
      limit: 1,
      success: function(listing) {
        self.render(listing);
      }
    });

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
