
/**
 * Dependencies
 */
var assert = require('assert');
var Retsly = require('retsly-backbone');
var Photo = require('retsly-phototile');

/**
 * Tests
 */

suite('PhotoTile')
test('is an object property', function() {
  assert('object' == typeof Photo, 'is an object')
});

suite('Phototile.Basic');
test('is a component function', function() {
  assert('function' == typeof Photo.Basic, 'has a component')
});

test('cannot be instantiated without Retsly.create()', function() {
  assert.throws(function() {
    new Photo.Basic({ client_id: 'xxx', vendorID: 'sandicor', listingID: 'xxx', target: { $el: '' } });
  }, Error);
});

test('can be instantiated after Retsly.create()', function(){
  assert.doesNotThrow(function() {
    Retsly.create('xxx', 'xxx');
    new Photo.Basic({ client_id: 'xxx', vendorID: 'sandicor', listingID: 'xxx', target: { $el: '' } });
  })
});

suite('Phototile.Basic.render(<model>)')
test('fails when it does not receive a model', function() {
  assert.throws(function() {
    var model = {
      photos: []
    };
    var photo = new Photo.Basic({ client_id: 'xxx', vendorID: 'sandicor', listingID: 'xxx', target: { $el: '' } });
    photo.render(model);
  })
});

test('passes when it does receive a model', function() {
  assert.doesNotThrow(function() {
    var model = new Retsly.Model({
      photos: []
    }, { collection: {}, vendorID: 'sandicor' });

    var photo = new Photo.Basic({ client_id: 'xxx', vendorID: 'sandicor', listingID: 'xxx', target: { $el: '' } });
    photo.render(model);
  })
});

