module.exports = '<ul>\n  <% _.each(Photos, function(photo, index) { %>\n    <li class=\'span12\'>\n      <% if(index === 0) { %>\n        <div class=\'retsly-js-phototile-overlay\'>\n          <h2> <%- Address %> <%- County %></h2>\n          <h3>$ <%- ListingPrice %> - <%- NumberOfBedrooms %> Bed, <%- NumberOfBaths %> Bath</h3>\n        </div>\n      <% } %>\n      <img src=\'<%- photo.Location %>\' />\n    </li>\n  <% }); %>\n</ul>\n';